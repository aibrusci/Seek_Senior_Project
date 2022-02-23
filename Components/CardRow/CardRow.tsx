import React,{useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ActivityCard from "../../Components/ActivityCard/ActivityCard";




type CardRowProps = {
    category: string;
    cards: any;
    username: string;
    refresh: any
    updateUsers: Function
};

type ActivityCardType = {
    id: string;
    title: string;
    date: string;
    image: string;
    savedIcon: boolean;
    savedUsers: any;
    refresh: any
    updateUsers: Function;
};

const CardRow: React.FC<CardRowProps> = (props) => {
    const _renderViews = (views: ActivityCardType[]): JSX.Element[] => {
        return views.map((card) => {
            return (
                <View style={styles.cardStyle}>
                    <ActivityCard
                        refresh={props.refresh}
                        username={props.username}
                        savedUsers={card.savedUsers}
                        id={card.id}
                        title={card.title}
                        date={card.date}
                        savedIcon={card.savedUsers.includes(props.username)}
                        image={card.image}
                        updateUsers = {props.updateUsers}
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
                pagingEnabled
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
        fontSize: 16
    }
});
export default CardRow;
