import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Searchbar from './Components/SearchBar/Searchbar';
import Logo from './Components/Logo/Logo';
import HomePage from './Pages/HomePage';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import awsConfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { createEvent } from './src/graphql/mutations'
import { listEvents, getEvent } from './src/graphql/queries'
import SearchPage from './Pages/SearchPage';

//import '@aws-amplify/ui-react/styles.css';

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

const getEvents = async () => {
  try {
      //const user = await Auth.currentAuthenticatedUser();
      const apiData = await API.graphql(graphqlOperation(listEvents))
      console.log(apiData);
      //const response = await API.graphql(graphqlOperation(createEvent, {input: {title:"COYA Taco Night"}}))
      // console.log('Response :\n');
      // console.log(response);
      //console.log(user);
    } catch (e) {
      console.log(e.message);
    }
}

function App (){
  return (
    <View>
      <StatusBar style="auto" />
      <View > 
      <View style={styles.topRow}>
          <Logo/>
          <Pressable style={styles.button} onPress={() => signOut()}> 
            <Text style={styles.buttonText}>Sign out</Text>
          </Pressable>
        </View>
        {/* <HomePage/> */}
        <SearchPage/>
      </View>
    </View>

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
