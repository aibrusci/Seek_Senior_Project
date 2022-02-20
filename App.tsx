import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Pressable
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Logo from "./Components/Logo/Logo";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import awsConfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import SavePage from './Pages/SavePage';
import UserPage from './Pages/UserPage';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./Navigation/Stack";
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

const Tab = createBottomTabNavigator();

function App() {
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular
    });
    return (
        <NavigationContainer>
            <View style={styles.header}>
                <Logo style={styles.Logo}></Logo>
                <Pressable style={styles.button} onPress={() => signOut()}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </Pressable>
            </View>
            <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: "abolute",
                    elevation: 0,
                    backgroundColor: "#fff",
                    borderTopWidth: 3,
                    borderColor: "#808080"
                }
            }}
            >
            <Tab.Screen
                name="SearchPage"
                component={MainStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("./assets/search-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#e32f45" : "#748c94"
                                }}
                            />
                        </View>
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="SavePage"
                component={SavePage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("./assets/save-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#e32f45" : "#748c94"
                                }}
                            />
                        </View>
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="UserPage"
                component={UserPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("./assets/user-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#e32f45" : "#748c94"
                                }}
                            />
                        </View>
                    )
                }}
            ></Tab.Screen>
          </Tab.Navigator>
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
        marginTop: 65
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

export default withAuthenticator(App);
