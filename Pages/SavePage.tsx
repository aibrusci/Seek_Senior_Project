import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from "react-native";
import Searchbar from "../Components/SearchBar/Searchbar";
import ActivityCard from "../Components/ActivityCard/ActivityCard";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { listEvents } from "../src/graphql/queries";
import { Button } from "react-native-elements";

type SavePageComponentProps = {
    showBackArrow: Boolean;
    setBackArrow: Function;
    cards: any;
    userInfo: any;
    savedSeeks: any;
    updateCards: Function;
    updateUsers: Function;
    filteredSavedCards: any;
};

const SavePage: React.FunctionComponent<SavePageComponentProps> = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.search}>
                    <Searchbar
                        showBackArrow={props.showBackArrow}
                        setBackArrow={props.setBackArrow}
                        pageType={"save"}
                        updateCards={props.updateCards}
                    ></Searchbar>
                </View>
                <Text style={styles.savedSeeks}>Saved Seeks</Text>
                {props.filteredSavedCards &&
                props.filteredSavedCards.length == 0 ? (
                    <View>
                        <Text style={styles.messageOne}>No saved seeks</Text>
                    </View>
                ) : (
                    <View>
                        <ScrollView
                            pagingEnabled
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >
                            {props.filteredSavedCards.map((c: any, i) => {
                                return (
                                    <View style={styles.cardStyle}>
                                        <ActivityCard
                                            username={props.userInfo.username}
                                            id={c.id}
                                            title={c.title}
                                            date={c.date}
                                            time={c.time}
                                            savedIcon={c.savedUsers.includes(
                                                props.userInfo.username
                                            )}
                                            savedUsers={c.savedUsers}
                                            image={c.image}
                                            updateUsers={props.updateUsers}
                                            description={c.description}
                                            filterCategories={
                                                c.filterCategories
                                            }
                                            location={c.location}
                                            price={c.price}
                                            website={c.website}
                                            rating={c.rating}
                                            category={c.category}
                                            pageType={"SavePage"}
                                        />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        marginLeft: 24,
        backgroundColor: "white"
    },
    container: {
        justifyContent: "space-between",
        backgroundColor: "#fff",
        height: 800
    },
    search: {
        marginLeft: -45,
        marginRight: -10
    },
    savedSeeks: {
        fontSize: 30,
        marginLeft: 0,
        marginTop: 20,
        color: "#FB7762"
    },
    messageOne: {
        marginTop: 150,
        fontSize: 20,
        textAlign: "center"
    },
    messageTwo: {
        marginTop: 15,
        fontSize: 20
    },
    cardStyle: {
        width: 160,
        height: 265,
        margin: 5,
        marginLeft: 0,
        borderRadius: 15
    }
});

export default SavePage;
