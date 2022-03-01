import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable
} from "react-native";
import Searchbar from "./Components/SearchBar/Searchbar";
import Logo from "./Components/Logo/Logo";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import awsConfig from "./src/aws-exports";
import {
    withAuthenticator,
    Authenticator,
    AmplifyTheme
} from "aws-amplify-react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import SearchPage from "./Pages/SearchPage";
import SearchBar from "react-native-elements";
import Tabs from "./navigation/tabs";
import { NavigationContainer } from "@react-navigation/native";
import LogoIcon from "./LogoIcon.png";
import { MainStackNavigator } from "./navigation/Stack";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";

Amplify.configure({
    ...awsConfig,
    Analytics: {
        disabled: true
    },
    Storage: {
        AWSS3: {
            bucket: "seekimagebucket",
            region: "us-east-1"
        }
    }
});

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

//const MyTheme = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'orange' });
const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, {
    background: "black"
});
// const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });
const authTheme = {
    ...AmplifyTheme,
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        color: "red",
        display: "flex",
        alignItems: "center"
    },
    sectionFooter: {
        ...AmplifyTheme.sectionFooter,
        backgroundColor: "white",
        textColor: "#FB7762"
    },
    button: {
        ...AmplifyTheme.button,
        backgroundColor: "#FB7762",
        borderRadius: 10,
        fontSize: 18
    },
    buttonText: {
        ...AmplifyTheme.buttonText,
        fontSize: 15,
        backgroundColor: "#FB7762"
    },
    sectionFooterLink: {
        ...AmplifyTheme.sectionFooterLink,
        backgroundColor: "white",
        color: "#FB7762",
        fontSize: 15
    },
    buttonDisabled: {
        backgroundColor: "#FB7760",
        alignItems: "center",
        padding: 16,
        borderRadius: 10
    }
};

function App() {
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular
    });
    return (
        <NavigationContainer>
            {fontsLoaded ? (
                <View style={styles.topRow}>
                    <Logo style={styles.Logo}></Logo>
                    <Pressable style={styles.button} onPress={() => signOut()}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </Pressable>
                </View>
            ) : (
                <Logo style={styles.Logo}></Logo>
            )}
            <MainStackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },

    button: {
        backgroundColor: "#FB7762",
        padding: 10,
        borderRadius: 6,
        width: 100,
        marginTop: 65,
        marginLeft: 145
    },

    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "WorkSans_400Regular"
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        paddingRight: 15,
        marginLeft: -5,
        paddingBottom: 10
    },
    Logo: {
        marginTop: 65,
        marginBottom: 10
    }
});

export default withAuthenticator(App, { theme: authTheme });
