import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import ActivityCard from "../Components/ActivityCard/ActivityCard";
import CardRow from "../Components/CardRow/CardRow";
import FilterRow from "../Components/Filter/FilterRow";
import Searchbar from "../Components/SearchBar/Searchbar";
import FilterMenu from "../Components/Filter/FilterMenu";

type CardType = {
    title: string;
    date: string;
    image: string;
    savedIcon: boolean;
    filterCategories: string[];
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
        <SafeAreaView style={styles.container}>
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
                                    cards={cardsExample.filter((item: any) => {
                                        if (
                                            item.filterCategories.includes(
                                                category
                                            )
                                        ) {
                                            return item;
                                        }
                                    })}
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
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        marginLeft: 24,
        backgroundColor: "#fff",
        maxHeight: 700
    },
    card: {}
});

const cardsExample = [
    {
        id: 1,
        title: "COYA Taco Night",
        date: "Tuesday Nights 5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ]
    },
    {
        id: 2,
        title: "Libertine Comedy Night",
        date: "Wednesday Nights 5-9pm",
        image: "https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg",
        savedIcon: true,
        filterCategories: ["Food", "Comedy", "Night Life", "Downtown"]
    },
    {
        id: 3,
        title: "Woodstock's Trivia Night",
        date: "Monday Nights 9-11pm",
        image: "https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png",
        savedIcon: true,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Trivia",
            "Night Life",
            "Downtown"
        ]
    },
    {
        id: 4,
        title: "Libertine Comedy Night",
        date: "Wednesday Nights 5-9pm",
        image: "https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg",
        savedIcon: true,
        filterCategories: ["Food", "Comedy", "Night Life", "Downtown"]
    },
    {
        id: 5,
        title: "Woodstock's Trivia Night",
        date: "Monday Nights 9-11pm",
        image: "https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png",
        savedIcon: true,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Trivia",
            "Night Life",
            "Downtown"
        ]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights 5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights 5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights 5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ]
    },
    {
        id: 6,
        title: "COYA Taco Night",
        date: "Tuesday Nights 5-9pm",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg",
        savedIcon: false,
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ]
    }
];
