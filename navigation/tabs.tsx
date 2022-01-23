import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../Pages/HomePage';
import SavePage from '../Pages/SavePage';
import UserPage from '../Pages/UserPage';

const Tab = createBottomTabNavigator();

export default function tabs (){
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle: {
                position: 'abolute',
                elevation: 0,
                backgroundColor: '#ffffff',
                borderTopWidth: 3,
                borderColor: '#808080',
                height: 70
            }
        }}
        >
            <Tab.Screen name="HomePage" component={HomePage} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require("../assets/search-icon.png")}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen name="SavePage" component={SavePage} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require("../assets/save-icon.png")}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen name="UserPage" component={UserPage} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require("../assets/user-icon.png")}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                    </View>
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}
