
import React, { useState, useEffect, useRef } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { listEvents } from "../src/graphql/queries";
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from '../Pages/MapPage';
import SearchPage from '../Pages/SearchPage';
import SavePage from '../Pages/SavePage';
import UserPage from '../Pages/UserPage';
const Tab = createBottomTabNavigator();



export default function Tabs() {

const [filteredCards, setFilteredCards] = useState([]);
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
        console.log(cardData);
        const newFilters = new Set();
        cardData.forEach((card) => {
            if (card.filterCategories) {
                card.filterCategories.forEach((category: any) =>
                    newFilters.add(category)
                );
            }
        });
        setFilters(Array.from(newFilters));
        let temp: any = []
        cardData.map((card: any) => {
            if(card.savedUsers.includes(user.username)) {
                temp.push(card)
            }
        })
        setSavedSeeks(temp)
        setRefresh(!refresh)
    })();
}, []);

function updateUsers(newUsers: any, id:any){
    let cards2 = [... cards]
    cards2.map((card: any) => {
      if(card.id === id) {
          card.savedUsers = newUsers
      }
  })
  setCards(cards2)
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
  let temp: any = []
  if (cards && userInfo) {
    cards.map((card: any) => {
      if(card.savedUsers.includes(userInfo.username)) {
          temp.push(card)
      }
  })
  setSavedSeeks(temp)
  }
   
}, [cards])

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: "abolute",
                    elevation: 0,
                    backgroundColor: "#fff",
                    borderTopWidth: 3,
                    borderColor: "#808080"
                }
            }}
        >
            <Tab.Screen
                name="SearchPage"
                children={()=><SearchPage 
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
                                />}
                initialParams={{ testProp: "test" }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("../assets/search-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#e32f45" : "#748c94"
                                }}
                            />
                        </View>
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="SavePage"
                children={()=><SavePage 
                              showBackArrow={showBackArrow}
                              setBackArrow={setBackArrow}
                              cards={cards}
                              userInfo={userInfo}
                              updateCards={updateCards}
                              updateUsers={updateUsers}
                              savedSeeks={savedSeeks}
                              />}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("../assets/save-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#e32f45" : "#748c94"
                                }}
                            />
                        </View>
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="UserPage"
                component={UserPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("../assets/user-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#e32f45" : "#748c94"
                                }}
                            />
                        </View>
                    )
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}
