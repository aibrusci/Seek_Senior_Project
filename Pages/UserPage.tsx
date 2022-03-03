import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    FlatList,
    SafeAreaView,
    Image,
    TouchableOpacity
} from "react-native";
import SeekLogo from "../assets/Seek.png";
import {
    useFonts,
    WorkSans_400Regular,
    WorkSans_700Bold,
    WorkSans_500Medium
} from "@expo-google-fonts/work-sans";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type UserPageComponentProps = {
    cards: any;
    userInfo: any;
    savedSeeks: any;
};

const UserPage: React.FunctionComponent<UserPageComponentProps> = (props) => {
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        WorkSans_700Bold,
        WorkSans_500Medium
    });
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            {fontsLoaded ? (
                <View>
                    <Image source={SeekLogo} style={styles.image} />
                    <Text style={styles.name}>Hello, Seeker</Text>
                    <View style={styles.saveColumn}>
                        <Button
                            buttonStyle={styles.roundButton}
                            title=""
                            onPress={() => navigation.navigate("SavePage")}
                            icon={
                                <FontAwesome
                                    name="bookmark-o"
                                    size={30}
                                    color="white"
                                />
                            }
                        ></Button>
                        <Text style={styles.savedText}>My Seeks</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.label}>Email: </Text>
                        <Text style={styles.email}>
                            {props.userInfo.attributes.email}
                        </Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.label}>Phone: </Text>
                        <Text style={styles.email}>
                            {props.userInfo.attributes.phone_number}
                        </Text>
                    </View>
                </View>
            ) : (
                <Image source={SeekLogo} style={styles.image} />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        // alignItems: "center",
        backgroundColor: "#ffffff",
        height: 800
    },
    image: {
        marginTop: 50,
        alignSelf: "center"
    },
    email: {
        color: "black",
        textAlign: "left",
        fontFamily: "WorkSans_400Regular",
        fontSize: 16
    },
    label: {
        color: "black",
        textAlign: "left",
        fontFamily: "WorkSans_700Bold",
        fontSize: 16
    },
    name: {
        color: "#FB7762",
        textAlign: "center",
        fontFamily: "WorkSans_700Bold",
        fontSize: 30,
        padding: 15
    },
    textRow: {
        display: "flex",
        flexDirection: "row",
        padding: 5,
        marginLeft: 20
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#FB7762",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center"
    },
    saveColumn: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        paddingBottom: 15,
        paddingTop: 5
    },
    savedText: {
        color: "black",
        textAlign: "center",
        fontFamily: "WorkSans_400Regular",
        fontSize: 14,
        lineHeight: 20
    }
});

export default UserPage;
