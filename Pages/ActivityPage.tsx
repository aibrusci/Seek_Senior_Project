import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal
} from "react-native";
import { Button, Divider } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking, Platform } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import S3StorageUpload from "../Components/S3StorageUpload/S3StorageUpload";
import Rating from "../Components/Rating/Rating";
import {
    useFonts,
    WorkSans_100Thin,
    WorkSans_200ExtraLight,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_800ExtraBold,
    WorkSans_900Black,
    WorkSans_100Thin_Italic,
    WorkSans_200ExtraLight_Italic,
    WorkSans_300Light_Italic,
    WorkSans_400Regular_Italic,
    WorkSans_500Medium_Italic,
    WorkSans_600SemiBold_Italic,
    WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold_Italic,
    WorkSans_900Black_Italic
} from "@expo-google-fonts/work-sans";
import Logo from "../Components/Logo/Logo";

type Event = {
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

const ActivityPage: React.FC<Event> = ({ navigation, route }) => {
    const [saved, setSaved] = useState(route.params.savedIcon);
    const [url, setUrl] = useState("");
    const [processing, setProcessing] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    let [fontsLoaded] = useFonts({
        WorkSans_100Thin,
        WorkSans_200ExtraLight,
        WorkSans_300Light,
        WorkSans_400Regular,
        WorkSans_500Medium,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
        WorkSans_800ExtraBold,
        WorkSans_900Black,
        WorkSans_100Thin_Italic,
        WorkSans_200ExtraLight_Italic,
        WorkSans_300Light_Italic,
        WorkSans_400Regular_Italic,
        WorkSans_500Medium_Italic,
        WorkSans_600SemiBold_Italic,
        WorkSans_700Bold_Italic,
        WorkSans_800ExtraBold_Italic,
        WorkSans_900Black_Italic
    });

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

    const renderHeader = () => (
        <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
                top: 50,
                zIndex: 9999,
                width: "100%",
                height: "15%",
                alignItems: "flex-end"
            }}
        >
            <Image
                source={require("../assets/close.png")}
                resizeMode="contain"
                style={{
                    width: 18,
                    margin: 20,
                    marginTop: 70,
                    zIndex: 9999,
                    height: "100%"
                }}
            />
        </TouchableOpacity>
    );

    if (!fontsLoaded) {
        return <Logo />;
    } else {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageBackground}>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                        onTouchCancel={() => setModalVisible(false)}
                        onDismiss={() => setModalVisible(false)}
                    >
                        <ImageViewer
                            imageUrls={Array.from(
                                route.params.image,
                                (image) => ({
                                    url: image,
                                    props: {}
                                })
                            )}
                            enableSwipeDown
                            onSwipeDown={() => setModalVisible(false)}
                            enableImageZoom={true}
                            renderIndicator={() => <Text />}
                            backgroundColor="rgba(0, 0, 0, 0.8)"
                            onCancel={() => setModalVisible(false)}
                            renderHeader={() => renderHeader()}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                height: "100%"
                            }}
                        />
                    </Modal>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: route.params.image[0] }}
                        ></Image>
                    </TouchableOpacity>

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

                        <View style={styles.newImage}>
                            <Button
                                buttonStyle={styles.roundButton}
                                title=""
                                onPress={updateSaved}
                                icon={
                                    saved ? (
                                        <FontAwesome
                                            name="bookmark"
                                            size={30}
                                            color="#FB7762"
                                        />
                                    ) : (
                                        <FontAwesome
                                            name="bookmark-o"
                                            size={30}
                                            color="#FB7762"
                                        />
                                    )
                                }
                            ></Button>
                            {/* <S3StorageUpload></S3StorageUpload> */}
                        </View>
                    </View>

                    <View style={styles.title}>
                        <Text style={styles.eventTitle}>
                            {route.params.title}
                        </Text>
                        <View style={styles.priceRating}>
                            {route.params.rating ? (
                                <Rating
                                    id={route.params.id}
                                    rating={route.params.rating}
                                ></Rating>
                            ) : (
                                <Rating
                                    id={route.params.id}
                                    rating={[]}
                                ></Rating>
                            )}
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
                        <Text style={styles.eventDate}>
                            {route.params.date}
                        </Text>
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
                        <Text style={styles.eventTime}>
                            {route.params.time}
                        </Text>
                    </View>
                </View>

                <Divider style={styles.divider}></Divider>

                <Text style={styles.eventDescription}>
                    {route.params.description}
                </Text>
            </ScrollView>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: "white"
    },
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        top: -545
    },
    image: {
        opacity: 0.8,
        height: 520
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
        top: -235,
        paddingLeft: 15
    },
    eventTitle: {
        fontFamily: "WorkSans_700Bold",
        fontSize: 26,
        lineHeight: 32,
        color: "white"
    },
    eventRating: {
        fontFamily: "WorkSans_700Bold",
        fontSize: 18,
        lineHeight: 22,
        color: "white"
    },
    titleRow: {
        display: "flex",
        flexDirection: "column"
    },
    eventPrice: {
        fontFamily: "WorkSans_700Bold",
        fontSize: 18,
        lineHeight: 22,
        color: "white"
    },
    priceRating: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10
    },
    eventLocation: {
        fontFamily: "WorkSans_400Regular",
        fontSize: 15,
        lineHeight: 32,
        color: "white"
    },
    buttonLabel: {
        textAlign: "center",
        color: "white",
        fontFamily: "WorkSans_400Regular",
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
        fontFamily: "WorkSans_400Regular",
        fontSize: 18,
        lineHeight: 22
    },
    eventDate: {
        fontFamily: "WorkSans_400Regular",
        fontSize: 18,
        lineHeight: 22
    },
    eventDescription: {
        padding: 20,
        fontFamily: "WorkSans_300Light",
        lineHeight: 24,
        paddingTop: 10
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
    },
    newImage: {
        display: "flex",
        justifyContent: "space-between"
    },
    roundButtonTop: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10
    }
});
export default ActivityPage;
