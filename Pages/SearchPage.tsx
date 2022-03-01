import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import ActivityCard from "../Components/ActivityCard/ActivityCard";
import CardRow from "../Components/CardRow/CardRow";
import Searchbar from "../Components/SearchBar/Searchbar";
import { API, graphqlOperation, Auth } from "aws-amplify";
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

type SearchPageComponentProps = {
    filteredCards: any;
    activeFilters: any;
    showBackArrow: Boolean;
    setBackArrow: Function;
    filters: any;
    cards: any;
    userInfo: any;
    updateUsers: Function;
    updateCards: Function;
    onFilterClick: Function;
    clearSelectedFilters: Function;
    _addRemoveFilter: Function;
    savedSeeks: any;
};

const SearchPage: React.FunctionComponent<SearchPageComponentProps> = (props) => {
    const refRBSheet = useRef();

    return (
        <SafeAreaView style={styles.container}>
        <Searchbar
            showBackArrow={props.showBackArrow}
            setBackArrow={props.setBackArrow}
            pageType={"home"}
            updateCards={props.updateCards}
        ></Searchbar>
        <FilterRow
            filters={props.filters}
            activeFilters={props.activeFilters}
            onFilterClick={props.onFilterClick}
            clearSelectedFilters={props.clearSelectedFilters}
            openMenu={() => refRBSheet.current.open()}
        ></FilterRow>
        {props.showBackArrow ? (
            <ScrollView
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >
                {props.filteredCards.map((c: any) => {
                 return(<View style={styles.card}>
                   <ActivityCard
                       username={props.userInfo.username}
                       id={c.id}
                       title={c.title}
                       date={c.date}
                       savedIcon={c.savedUsers.includes(props.userInfo.username)}
                       savedUsers={c.savedUsers}
                       image={c.image}
                       updateUsers = {props.updateUsers}/>
                 </View>);
                })}
            </ScrollView>
        ) : (
            <ScrollView
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {props.filters.map((category) => {
                        return (
                            <CardRow
                                updateUsers={props.updateUsers}
                                username={props.userInfo.username}
                                cards={props.cards.filter((item: any) => {
                                    if(item.filterCategories){
                                      if (
                                        item.filterCategories.includes(
                                            category
                                        )
                                    ) {
                                        return item;
                                    }
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
            filters={props.filters}
            activeFilters={props.activeFilters}
            onFilterClick={props.onFilterClick}
            clearSelectedFilters={props.clearSelectedFilters}
        ></FilterMenu>
    </SafeAreaView>
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

export default SearchPage