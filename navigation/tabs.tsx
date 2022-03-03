import React, { useState, useEffect, useRef } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { listEvents } from "../src/graphql/queries";
import { Image, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapPage from "../Pages/MapPage";
import SearchPage from "../Pages/SearchPage";
import SavePage from "../Pages/SavePage";
import UserPage from "../Pages/UserPage";
const Tab = createBottomTabNavigator();


export default function Tabs(props: any) {
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
                children={() => (
                    <SearchPage
                        filteredCards={props.filteredCards}
                        activeFilters={props.activeFilters}
                        showBackArrow={props.showBackArrow}
                        setBackArrow={props.setBackArrow}
                        filters={props.filters}
                        cards={props.cards}
                        userInfo={props.userInfo}
                        updateUsers={props.updateUsers}
                        updateCards={props.updateCards}
                        onFilterClick={props.onFilterClick}
                        clearSelectedFilters={props.clearSelectedFilters}
                        _addRemoveFilter={props._addRemoveFilter}
                        savedSeeks={props.savedSeeks}
                    />
                )}
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
                children={() => (
                    <SavePage
                        showBackArrow={props.showBackArrow}
                        setBackArrow={props.setBackArrow}
                        cards={props.cards}
                        userInfo={props.userInfo}
                        updateCards={props.updateSavedCards}
                        updateUsers={props.updateUsers}
                        savedSeeks={props.savedSeeks}
                        filteredSavedCards={props.filteredSavedCards}
                    />
                )}
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
                // component={UserPage}
                children={() => (
                    <UserPage
                        cards={props.cards}
                        userInfo={props.userInfo}
                        savedSeeks={props.savedSeeks}
                    />
                )}
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
