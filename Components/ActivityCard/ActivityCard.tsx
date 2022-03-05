import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateEvent } from "../../src/graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

type ActivityCardProps = {
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
    username: string;
    updateUsers: Function;
    savedUsers: any;
    pageType: String;
};

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
    const [saved, setSaved] = useState(props.savedIcon);
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular
    });

    const updateSaved = async (search: any) => {
        let currentSavedUsers = props.savedUsers;

        if (saved) {
            const index = currentSavedUsers.indexOf(props.username);
            currentSavedUsers.splice(index, 1);
        } else {
            currentSavedUsers.push(props.username);
        }
        const updatedEvent = await API.graphql(
            graphqlOperation(updateEvent, {
                input: { id: props.id, savedUsers: currentSavedUsers }
            })
        );
        setSaved(!saved);
        props.updateUsers(currentSavedUsers, props.id);
        props.savedIcon = saved;
    };

    return (
        <TouchableOpacity
            style={[props.pageType == "MapPage" ? styles.mapFullCard : styles.fullCard]}
            onPress={() =>
                navigation.navigate("ActivityPage", {
                    screen: "ActivityPage",
                    ...props
                })
            }
        >
            <Image
                style={[props.pageType == "MapPage" ? styles.mapImage : styles.image]}
                source={{ uri: props.image[0] }}
            ></Image>
            <View style={styles.cardFooter}>
                <View style={[props.pageType == "MapPage" ? styles.mapCardText : styles.cardText]}>
                    <Text numberOfLines={1} style={[props.pageType == "MapPage" ? styles.mapActivityName : styles.activityName]}>{props.title}</Text>
                    <Text numberOfLines={1} style={styles.date}>
                        {props.date} {props.time}
                    </Text>
                    {props.pageType == "MapPage" ?
                    <Text numberOfLines={2} style={styles.mapCardDescription}>{props.description}</Text>
                    : null}
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
        fontFamily: "WorkSans_400Regular"
    },
    cardFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    activityName: {
        fontWeight: "500",
        fontSize: 12,
        color: "#000000",
        paddingTop: 5,
        fontFamily: "WorkSans_400Regular"
    },
    date: {
        fontSize: 10,
        lineHeight: 14,
        color: "#000000",
        fontFamily: "WorkSans_400Regular"
    },
    image: {
        width: 160,
        height: 191,
        borderRadius: 5
    },
    iconButton: {
        backgroundColor: "#FFF",
        color: "#fff"
    },
    mapFullCard: {
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    mapCardText: {
        fontFamily: "WorkSans_400Regular",
        flex: 2,
        padding: 10,
    },
    mapCardDescription: {
        paddingTop: 2,
        fontSize: 10,
        color: "#444",
        fontFamily: "WorkSans_400Regular"
    },
    mapActivityName: {
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "WorkSans_400Regular"
    },
    mapImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
});
export default ActivityCard;
