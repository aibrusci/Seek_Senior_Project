import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ActivityCard from "../../Components/ActivityCard/ActivityCard";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";

type CardRowProps = {
    category: string;
    cards: any;
    username: string;
    updateUsers: Function;
};

type ActivityCardType = {
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
    savedUsers: any;
    updateUsers: Function;
    pageType: String;
};

const CardRow: React.FC<CardRowProps> = (props) => {
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular
    });
    const _renderViews = (views: ActivityCardType[]): JSX.Element[] => {
        return views.map((card, i) => {
            return (
                <View style={styles.cardStyle} key={i}>
                    <ActivityCard
                        id={card.id}
                        title={card.title}
                        date={card.date}
                        image={card.image}
                        savedIcon={card.savedUsers.includes(props.username)}
                        description={card.description}
                        time={card.time}
                        filterCategories={card.filterCategories}
                        location={card.location}
                        category={card.category}
                        price={card.price}
                        website={card.website}
                        rating={card.rating}
                        updateUsers={props.updateUsers}
                        username={props.username}
                        savedUsers={card.savedUsers}
                        pageType={card.pageType}
                    />
                </View>
            );
        });
    };

    return (
        <View style={styles.category}>
            <Text style={styles.categoryName}>{props.category}</Text>
            <ScrollView
                horizontal
                // pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {_renderViews(props.cards)}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    category: {},
    cardStyle: {
        width: 160,
        height: 265,
        margin: 5,
        marginLeft: 0,
        borderRadius: 15
    },
    categoryName: {
        display: "flex",
        flexDirection: "column",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "WorkSans_400Regular"
    }
});
export default CardRow;
