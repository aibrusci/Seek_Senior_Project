import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Searchbar from './Components/SearchBar/Searchbar';
import Logo from './Components/Logo/Logo'


export default function App() {
  return (
    <View>
      <Logo/>
      <Searchbar pageType="home"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
