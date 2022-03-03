import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityPage from "../Pages/ActivityPage";
import MapPage from "../Pages/MapPage";
import SearchPage from "../Pages/SearchPage";
import Tabs from "./tabs";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { listEvents } from "../src/graphql/queries";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    const navigation = useNavigation();
    const [filteredCards, setFilteredCards] = useState([]);
    const [filteredSavedCards, setFilteredSavedCards] = useState([]);
    const [activeFilters, setactiveFilters] = useState(Array());
    const [showBackArrow, setBackArrow] = useState(false);
    const [filters, setFilters] = useState(Array());
    const [cards, setCards] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [savedSeeks, setSavedSeeks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await Auth.currentAuthenticatedUser();
            const apiData = await API.graphql(graphqlOperation(listEvents));
            const cardData = apiData.data.listEvents.items;
            setCards(cardData);
            setFilteredCards(cardData);
            setUserInfo(user);
            const newFilters = new Set();
            cardData.forEach((card) => {
                if (card.filterCategories) {
                    card.filterCategories.forEach((category: any) =>
                        newFilters.add(category)
                    );
                }
            });
            setFilters(Array.from(newFilters));
            let temp: any = [];
            cardData.map((card: any) => {
                if (card.savedUsers.includes(user.username)) {
                    temp.push(card);
                }
            });
            setSavedSeeks(temp);
            setFilteredSavedCards(temp);
            setRefresh(!refresh);
        })();
    }, []);


useEffect(() => {
    (async () => {
        const user = await Auth.currentAuthenticatedUser();
        const apiData = await API.graphql(graphqlOperation(listEvents));
        const cardData = apiData.data.listEvents.items;
        setCards(cardData);
        setFilteredCards(cardData);
        setUserInfo(user);
        const newFilters = new Set();
        cardData.forEach((card) => {
            if (card.filterCategories) {
                card.filterCategories.forEach((category: any) =>
                    newFilters.add(category)
                );
            }
        })
    }
    )})

    function updateUsers(newUsers: any, id: any) {
        let cards2 = [...cards];
        cards2.map((card: any) => {
            if (card.id === id) {
                card.savedUsers = newUsers;
            }
        });
        setCards(cards2);
    }

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
    function updateSavedCards(search: string) {
        setFilteredSavedCards(
            savedSeeks.filter((item: any) => {
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

    const _addRemoveFilter = (filter: string, activeFilters: any[]) => {
        const index = activeFilters.indexOf(filter);
        if (index > -1) {
            activeFilters.splice(index, 1);
        } else {
            activeFilters.push(filter);
        }
        return activeFilters;
    };

    const clearSelectedFilters = () => {
        setactiveFilters([]);
        setBackArrow(false);
    };

    useEffect(() => {
        let temp: any = [];
        if (cards && userInfo) {
            cards.map((card: any) => {
                if (card.savedUsers.includes(userInfo.username)) {
                    temp.push(card);
                }
            });
            setSavedSeeks(temp);
            setFilteredSavedCards(temp);
        }
    }, [cards]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchPage"
                children={() => (
                    <Tabs
                        filteredCards={filteredCards}
                        activeFilters={activeFilters}
                        showBackArrow={showBackArrow}
                        setBackArrow={setBackArrow}
                        filters={filters}
                        cards={cards}
                        userInfo={userInfo}
                        updateUsers={updateUsers}
                        updateCards={updateCards}
                        onFilterClick={onFilterClick}
                        clearSelectedFilters={clearSelectedFilters}
                        _addRemoveFilter={_addRemoveFilter}
                        savedSeeks={savedSeeks}
                        filteredSavedCards={filteredSavedCards}
                    />
                )}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ActivityPage"
                component={ActivityPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MapPage"
                children={() => (
                    <MapPage
                        filteredCards={filteredCards}
                        activeFilters={activeFilters}
                        showBackArrow={showBackArrow}
                        setBackArrow={setBackArrow}
                        filters={filters}
                        cards={cards}
                        userInfo={userInfo}
                        updateUsers={updateUsers}
                        updateCards={updateCards}
                        onFilterClick={onFilterClick}
                        clearSelectedFilters={clearSelectedFilters}
                        _addRemoveFilter={_addRemoveFilter}
                        savedSeeks={savedSeeks}
                        filteredSavedCards={filteredSavedCards}
                    />
                )}
                options={{
                    title: "MapPage",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 125,
        marginLeft: 10
    },
    button: {
        bottom: 20,
        alignItems: "center"
    }
});

export { MainStackNavigator };
