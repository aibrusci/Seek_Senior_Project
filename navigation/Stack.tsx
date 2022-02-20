import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityPage from "../Pages/ActivityPage";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapPage from "../Pages/MapPage";
import SearchPage from "../Pages/SearchPage";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchPage"
                component={SearchPage}
                options={{
                    title: "SearchPage",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ActivityPage"
                component={ActivityPage}
                options={{
                    title: "ActivityPage",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MapPage"
                component={MapPage}
                options={{
                    title: "MapPage",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 125,
        marginLeft: 10
    },
    button: {
        bottom: 20,
        alignItems: "center"
    }
});

export { MainStackNavigator };
