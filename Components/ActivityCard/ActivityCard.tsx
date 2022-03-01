import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateEvent } from "../../src/graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";

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
    savedUsers: any;
    username: string;
    refresh: any;
    updateUsers: Function;
};

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
    const [saved, setSaved] = useState(props.savedIcon);
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular
    });

    const updateSaved = async (search: any) => {
        // Will need to add post request here to save to their account later
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
        props.refresh;
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
        fontFamily: "WorkSans_400Regular"
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
    }
});
export default ActivityCard;
