import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Searchbar from './Components/SearchBar/Searchbar';
import Logo from './Components/Logo/Logo';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import awsConfig from './src/aws-exports';
import { withAuthenticator, Authenticator, AmplifyTheme } from 'aws-amplify-react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import SearchPage from './Pages/SearchPage';
import SearchBar  from 'react-native-elements';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';
import LogoIcon from './LogoIcon.png';

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

//const MyTheme = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'orange' });
const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'black' });
// const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });
const authTheme = {
  ...AmplifyTheme,
  sectionHeader:{
    ...AmplifyTheme.sectionHeader,
    color:"red",
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
      borderRadius: "10px",
      fontSize: "18px"
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    fontSize: "15px",
    backgroundColor: "#FB7762",
},
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    backgroundColor: "white",
    color: "#FB7762",
    fontSize: "15px"
  },
  buttonDisabled: {
		backgroundColor: "#FB7760",
		alignItems: 'center',
    padding: 16,
    borderRadius: "10px"
	}
}


function App() {

  return (
    <NavigationContainer>
      <View style={styles.topRow}>
        <Logo/>
        <Pressable style={styles.button} onPress={() => signOut()}> 
              <Text style={styles.buttonText}>Sign out</Text>
         </Pressable>
      </View>
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
    marginLeft: 140,
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
  },

  logo: {
    marginRight: 600
  }
  
});

export default withAuthenticator(App, { theme: authTheme });
