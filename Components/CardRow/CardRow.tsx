import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ActivityCard from "../../Components/ActivityCard/ActivityCard";

type CardRowProps = {
    category: string;
    cards: any;
};
type ActivityCardType = {
    title: string;
    date: string;
    image: string;
    savedIcon: boolean;
};

const CardRow: React.FC<CardRowProps> = (props) => {
    const _renderViews = (views: ActivityCardType[]): JSX.Element[] => {
        return views.map((card) => {
            return (
                <View style={styles.cardStyle}>
                    <ActivityCard
                        title={card.title}
                        date={card.date}
                        savedIcon={false}
                        image={card.image}
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
