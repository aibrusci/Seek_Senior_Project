import React from "react";
import { StyleSheet } from "react-native";
import { MainStackNavigator } from "./Navigation/Stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {}
});
