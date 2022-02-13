import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

type ActivityCardProps = {
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

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
    const [saved, setSaved] = useState(props.savedIcon);
    const navigation = useNavigation();

    const updateSaved = (search: any) => {
        // Will need to add post request here to save to their account later
        setSaved(!saved);
    };

    return (
        <TouchableOpacity
            style={styles.fullCard}
            onPress={() =>
                navigation.navigate("ActivityPage", {
                    screen: "ActivityPage",
                    ...props
                })
            }
        >
            <Image
                style={styles.image}
                source={{ uri: props.image[0] }}
            ></Image>
            <View style={styles.CardFooter}>
                <View style={styles.cardText}>
                    <Text style={styles.activityName}>{props.title}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
                <Button
                    buttonStyle={{
                        backgroundColor: "#FFF"
                    }}
                    title=""
                    onPress={updateSaved}
                    icon={
                        saved ? (
                            <FontAwesome
                                name="bookmark"
                                size={24}
                                color="#FB7762"
                            />
                        ) : (
                            <FontAwesome
                                name="bookmark-o"
                                size={24}
                                color="#FB7762"
                            />
                        )
                    }
                ></Button>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    fullCard: {
        width: 160,
        maxHeight: 260,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        margin: 10,
        marginLeft: 0
    },
    cardText: {
        paddingLeft: 5,
        display: "flex",
        flexDirection: "column",
        flexShrink: 1,
        fontFamily: "WorkSans-Regular"
    },
    CardFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    activityName: {
        fontWeight: "500",
        fontSize: 12,
        color: "#000000",
        paddingTop: 5,
        fontFamily: "WorkSans-Regular"
    },
    date: {
        fontSize: 10,
        lineHeight: 14,
        color: "#000000",
        fontFamily: "WorkSans-Regular"
    },
    image: {
        width: 160,
        height: 191,
        borderRadius: 5
    },
    iconButton: {
        backgroundColor: "#FFF",
        color: "#fff"
    }
});
export default ActivityCard;
