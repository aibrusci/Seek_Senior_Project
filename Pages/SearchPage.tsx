import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import ActivityCard from "../Components/ActivityCard/ActivityCard";
import CardRow from "../Components/CardRow/CardRow";
import Searchbar from "../Components/SearchBar/Searchbar";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { createEvent } from "../src/graphql/mutations";
import { listEvents } from "../src/graphql/queries";
import FilterRow from "../Components/Filter/FilterRow";
import FilterMenu from "../Components/Filter/FilterMenu";
import Logo from "../Components/Logo/Logo";

type CardType = {
    id: String;
    title: String;
    date: String;
    image: string[];
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
    const [filteredCards, setFilteredCards] = useState([]);
    const [activeFilters, setactiveFilters] = useState(Array());
    const [showBackArrow, setBackArrow] = useState(false);
    const [filters, setFilters] = useState(Array());
    const refRBSheet = useRef();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        (async () => {
            const user = await Auth.currentAuthenticatedUser();
            const apiData = await API.graphql(graphqlOperation(listEvents));
            const cardData = apiData.data.listEvents.items;
            setCards(cardData);
            setFilteredCards(cardData);

            const newFilters = new Set();
            cardData.forEach((card) => {
                if (card.filterCategories) {
                    card.filterCategories.forEach((category) =>
                        newFilters.add(category)
                    );
                }
            });
            setFilters(Array.from(newFilters));
        })();
    }, []);

    useEffect(() => {
        if (!showBackArrow) {
            clearSelectedFilters();
        }
    }, [showBackArrow]);

    function updateCards(search: string) {
        setFilteredCards(
            cards.filter((item: any) => {
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
            cards.filter((item: any) => {
                if (
                    activeFilters.every((val) => {
                        if (item.filterCategories) {
                            return item.filterCategories.includes(val);
                        } else {
                            return false;
                        }
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

    return (
        <View style={styles.viewContainer}>
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
                                        id={c.id}
                                        title={c.title}
                                        date={c.date}
                                        image={c.image}
                                        savedIcon={false}
                                        description={c.description}
                                        time={c.time}
                                        filterCategories={c.filterCategories}
                                        location={c.locatiton}
                                        category={c.category}
                                        price={c.price}
                                        website={c.website}
                                        rating={c.rating}
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
                                        cards={cards.filter((item: any) => {
                                            if (
                                                item.filterCategories &&
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
