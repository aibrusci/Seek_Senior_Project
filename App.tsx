import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Searchbar from './Components/SearchBar/Searchbar';
import Logo from './Components/Logo/Logo';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import awsConfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import SearchPage from './Pages/SearchPage';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar  from 'react-native-elements';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';

Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
});

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


function App() {

  return (
    <NavigationContainer>
        <Pressable style={styles.button} onPress={() => signOut()}> 
            <Text style={styles.buttonText}>Sign out</Text>
         </Pressable>
        <Tabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    backgroundColor: '#FB7762',
    padding: 10,
    borderRadius: 6,
    width: 100,
    marginLeft: 150,
    marginTop: 75
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center"
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default withAuthenticator(App);
