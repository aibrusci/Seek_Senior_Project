import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { Button, Divider } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking, Platform } from "react-native";

type Event = {
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
};

const ActivityPage: React.FC<Event> = ({ navigation, route }) => {
    const [saved, setSaved] = useState(route.params.savedIcon);
    const [url, setUrl] = useState("");
    const [processing, setProcessing] = useState(true);

    const updateSaved = (search: any) => {
        // Will need to add post request here to save to their account later
        setSaved(!saved);
    };

    const openMap = async (address: string) => {
        console.log(address);
        const destination = encodeURIComponent(address);
        const provider = Platform.OS === "ios" ? "apple" : "google";
        const link = `http://maps.${provider}.com/?daddr=${destination}`;

        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) Linking.openURL(link);
        } catch (error) {
            console.log(error);
        }
    };
    const openWebsite = async (address: string) => {
        console.log(address);
        try {
            const supported = await Linking.canOpenURL(address);

            if (supported) Linking.openURL(address);
        } catch (error) {
            console.log(error);
        }
    };
    const openWeather = async (address: string) => {
        console.log(address);
        const destination = encodeURIComponent(address);
        const provider = Platform.OS === "ios" ? "apple" : "google";
        const link = `weather://${provider}.com/?daddr=${destination}`;

        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) Linking.openURL(link);
        } catch (error) {
            console.log(error);
        }
    };

    const openText = async (name: string) => {
        const operator = Platform.select({ ios: "&", android: "?" });
        const link = `sms:${operator}body=Hey! I found ${name} on the mobile app Seek. When are you free to go? ${url} `;

        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) Linking.openURL(link);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUrlAsync = async () => {
            // Get the deep link used to open the app
            const initialUrl = await Linking.getInitialURL();

            // The setTimeout is just for testing purpose
            setTimeout(() => {
                setUrl(initialUrl);
                setProcessing(false);
            }, 1000);
        };

        getUrlAsync();
        console.log(url);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageBackground}>
                <Image
                    style={styles.image}
                    source={{ uri: route.params.image }}
                ></Image>

                <View style={styles.top}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require("../assets/arrow_back_ios.png")}
                            resizeMode="contain"
                            style={{
                                width: 24,
                                height: 24,
                                paddingTop: 50
                            }}
                        />
                    </TouchableOpacity>
                    <Button
                        buttonStyle={styles.roundButton}
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
                <View style={styles.title}>
                    <Text style={styles.eventTitle}>{route.params.title}</Text>
                    <View style={styles.priceRating}>
                        {[1, 2, 3, 4, 5].map((a) => (
                            <Image
                                source={require("../assets/FilledStar.png")}
                                resizeMode="contain"
                                style={{
                                    width: 18,
                                    height: 18,
                                    marginTop: 2
                                }}
                            />
                        ))}
                        <Text style={styles.eventPrice}> • </Text>
                        <Text style={styles.eventPrice}>
                            {" "}
                            {route.params.price}
                        </Text>
                    </View>
                    <Text style={styles.eventLocation}>
                        {route.params.location}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonBar}>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => openMap(route.params.location)}
                    >
                        <Image
                            source={require("../assets/Directions.png")}
                            resizeMode="contain"
                            style={{
                                width: 31,
                                height: 31,
                                paddingTop: 50
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Directions</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => openWeather(route.params.location)}
                    >
                        <Image
                            source={require("../assets/cloud.png")}
                            resizeMode="contain"
                            style={{
                                width: 31,
                                height: 31,
                                paddingTop: 50
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Weather</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => openText(route.params.title)}
                    >
                        <Image
                            source={require("../assets/upload.png")}
                            resizeMode="contain"
                            style={{
                                width: 31,
                                height: 31,
                                paddingTop: 50
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Share</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => openWebsite(route.params.website)}
                    >
                        <Image
                            source={require("../assets/Send.png")}
                            resizeMode="contain"
                            style={{
                                width: 31,
                                height: 31,
                                paddingTop: 50
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Website</Text>
                </View>
            </View>

            <View style={styles.times}>
                <View style={styles.timeBlock}>
                    <Image
                        source={require("../assets/Calendar.png")}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            paddingTop: 50,
                            marginRight: 10
                        }}
                    />
                    <Text style={styles.eventDate}>{route.params.date}</Text>
                </View>
                <View style={styles.timeBlock}>
                    <Image
                        source={require("../assets/clock.png")}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            paddingTop: 50,
                            marginRight: 10
                        }}
                    />
                    <Text style={styles.eventTime}>{route.params.time}</Text>
                </View>
            </View>

            <Divider style={styles.divider}></Divider>

            <Text style={styles.eventDescription}>
                {route.params.description}
            </Text>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {},
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        top: -460
    },
    image: {
        opacity: 0.8,
        height: 466,
        width: 401
    },
    imageBackground: {
        backgroundColor: "black",
        height: 466
    },
    buttonBar: {
        maxWidth: 390,
        maxHeight: 55,
        backgroundColor: "#FB7762",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    divider: {
        borderColor: "#D0D0D0",
        borderRadius: 1,
        borderStyle: "solid",
        width: 342,
        alignSelf: "center"
    },
    title: {
        top: -200,
        paddingLeft: 15
    },
    eventTitle: {
        fontFamily: "WorkSans-Bold",
        fontSize: 26,
        lineHeight: 32,
        color: "white"
    },
    eventRating: {
        fontFamily: "WorkSans-Bold",
        fontSize: 18,
        lineHeight: 22,
        color: "white"
    },
    titleRow: {
        display: "flex",
        flexDirection: "column"
    },
    eventPrice: {
        fontFamily: "WorkSans-Bold",
        fontSize: 18,
        lineHeight: 22,
        color: "white"
    },
    priceRating: {
        display: "flex",
        flexDirection: "row"
    },
    eventLocation: {
        fontFamily: "WorkSans-Regular",
        fontSize: 15,
        lineHeight: 32,
        color: "white"
    },
    buttonLabel: {
        textAlign: "center",
        color: "white",
        fontFamily: "WorkSans-Regular",
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 22
    },
    times: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    timeBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    eventTime: {
        fontFamily: "WorkSans-Bold",
        fontSize: 18,
        lineHeight: 22
    },
    eventDate: {
        fontFamily: "WorkSans-Bold",
        fontSize: 18,
        lineHeight: 22
    },
    eventDescription: {
        padding: 10,
        fontFamily: "WorkSans-Light"
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    button: {
        bottom: 20,
        alignItems: "center"
    }
});
export default ActivityPage;
