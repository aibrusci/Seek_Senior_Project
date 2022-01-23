import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Searchbar from './Components/SearchBar/Searchbar';
import SearchBar  from 'react-native-elements';
import Logo from './Components/Logo/Logo';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  return (
    <NavigationContainer>
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
});
