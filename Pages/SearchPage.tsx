import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import ActivityCard from "../Components/ActivityCard/ActivityCard";
import CardRow from "../Components/CardRow/CardRow";
import FilterRow from "../Components/Filter/FilterRow";
import Searchbar from "../Components/SearchBar/Searchbar";
import FilterMenu from "../Components/Filter/FilterMenu";
import Logo from "../Components/Logo/Logo";

type CardType = {
    id: String;
    title: String;
    date: String;
    image: string;
    savedIcon: Boolean;
    description: String;
    time: String;
    filterCategories: [String];
    location: String;
    category: String;
    price: string;
    website: string;
    rating: [number];
};

export default function SearchPage() {
    const [filteredCards, setFilteredCards] = useState(cardsExample);
    const [activeFilters, setactiveFilters] = useState(Array());
    const [showBackArrow, setBackArrow] = useState(false);
    const [filters, setFilters] = useState(_getAllFilters(cardsExample));
    const refRBSheet = useRef();

    function updateCards(search: string) {
        setFilteredCards(
            cardsExample.filter((item: any) => {
                if (item.title.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            })
        );
        if (search === "") {
            setBackArrow(false);
        } else {
            setBackArrow(true);
        }
    }
    const onFilterClick = (filter: string) => {
        const active = _addRemoveFilter(filter, activeFilters);
        setactiveFilters(active);
        filters.sort((a: any, b: any) => {
            if (activeFilters.includes(a)) {
                return -1;
            }
            if (activeFilters.includes(b)) {
                return 1;
            }
            return 0;
        });
        setFilteredCards(
            cardsExample.filter((item: any) => {
                if (
                    activeFilters.every((val) => {
                        return item.filterCategories.includes(val);
                    })
                ) {
                    return item;
                }
            })
        );
        if (activeFilters.length) {
            setBackArrow(true);
        } else {
            setBackArrow(false);
        }
    };
    useEffect(() => {
        if (!showBackArrow) {
            clearSelectedFilters();
        }
    }, [showBackArrow]);

    const clearSelectedFilters = () => {
        setactiveFilters([]);
        setBackArrow(false);
    };

    const _addRemoveFilter = (filter: string, activeFilters: any[]) => {
        const index = activeFilters.indexOf(filter);
        if (index > -1) {
            activeFilters.splice(index, 1);
        } else {
            activeFilters.push(filter);
        }
        return activeFilters;
    };

    function _getAllFilters(cards: CardType[]) {
        const newFilters = new Set();
        cards.forEach((card) =>
            card.filterCategories.forEach((category) =>
                newFilters.add(category)
            )
        );
        return Array.from(newFilters);
    }

    return (
        <View style={styles.viewContainer}>
            <Logo style={styles.Logo}></Logo>
            <SafeAreaView style={styles.container}>
                <View style={styles.viewContainer}></View>

                <Searchbar
                    showBackArrow={showBackArrow}
                    setBackArrow={setBackArrow}
                    pageType={"home"}
                    updateCards={updateCards}
                ></Searchbar>
                <FilterRow
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterClick={onFilterClick}
                    clearSelectedFilters={clearSelectedFilters}
                    openMenu={() => refRBSheet.current.open()}
                ></FilterRow>
                {showBackArrow ? (
                    <ScrollView
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}
                    >
                        {filteredCards.map((c) => {
                            return (
                                <View style={styles.card}>
                                    <ActivityCard
                                        title={c.title}
                                        date={c.date}
                                        savedIcon={false}
                                        image={c.image}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                ) : (
                    <ScrollView
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.card}>
                            {filters.map((category) => {
                                return (
                                    <CardRow
                                        cards={cardsExample.filter(
                                            (item: any) => {
                                                if (
                                                    item.filterCategories.includes(
                                                        category
                                                    )
                                                ) {
                                                    return item;
                                                }
                                            }
                                        )}
                                        category={String(category)}
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                )}
                <FilterMenu
                    refRBSheet={refRBSheet}
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterClick={onFilterClick}
                    clearSelectedFilters={clearSelectedFilters}
                ></FilterMenu>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        marginLeft: 24,
        backgroundColor: "#fff",
        maxHeight: 800
    },
    viewContainer: {
        backgroundColor: "#fff"
    },
    card: {},
    Logo: {
        margin: -240,
        padding: -24
    }
});

const cardsExample = [
    {
        id: 1,
        title: "COYA Taco Night",
        date: "Tuesday Nights",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        time: "5-9pm",
        website: "https://www.instagram.com/coyaperuvianfood/?hl=en",
        rating: [5, 3, 5, 4]
    },
    {
        id: 2,
        title: "Libertine Comedy Night",
        date: "Wednesday Nights 5-9pm",
        image: "https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg",
        savedIcon: true,
        filterCategories: ["Food", "Comedy", "Night Life", "Downtown"],
        description: "Food",
        location: "123 Higuera St",
        category:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        price: "$",
        time: "5-9pm",
        website: "http://libertinebrewing.com/libertine-event-calendar/",
        rating: [5, 3, 5, 4]
    },
    {
        id: 3,
        title: "Woodstock's Trivia Night",
        date: "Monday Nights",
        image: "https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png",
        savedIcon: true,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Trivia",
            "Night Life",
            "Downtown"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        time: "9-11pm",
        website: "https://woodstocksslo.com/events/",
        rating: [5, 3, 5, 4]
    },
    {
        id: 4,
        title: "Libertine Comedy Night",
        date: "Wednesday Nights",
        image: "https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg",
        savedIcon: true,
        filterCategories: ["Food", "Comedy", "Night Life", "Downtown"],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        time: "5-9pm",
        website: "http://libertinebrewing.com/libertine-event-calendar/",
        rating: [5, 3, 5, 4]
    },
    {
        id: 5,
        title: "Woodstock's Trivia Night",
        date: "Tuesday Nights",
        image: "https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png",
        savedIcon: true,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Trivia",
            "Night Life",
            "Downtown"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        time: "9-11pm",
        website: "https://woodstocksslo.com/events/",
        rating: [5, 3, 5, 4]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        time: "5-9pm",
        website: "https://www.instagram.com/coyaperuvianfood/?hl=en",
        rating: [5, 3, 5, 4]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights",
        time: "5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        website: "https://www.instagram.com/coyaperuvianfood/?hl=en",
        rating: [5, 3, 5, 4]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights",
        time: "5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        website: "https://www.instagram.com/coyaperuvianfood/?hl=en",
        rating: [5, 3, 5, 4]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights",
        time: "5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ],
        description:
            "SLO Comedy Undergrounds comes to you live with an awesome lineup on October 6th with headliner: Sam Goldstein! Tickets are already selling out so buy them while you can!\nTickets are $5 each and can be purchased",
        location: "123 Higuera St",
        category: "Food",
        price: "$",
        website: "https://www.instagram.com/coyaperuvianfood/?hl=en",
        rating: [5, 3, 5, 4]
    }
];
