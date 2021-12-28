import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Searchbar from './Components/SearchBar/Searchbar';
import SearchBar  from 'react-native-elements';
import Logo from './Components/Logo/Logo';
import ActivityCard from './Components/ActivityCard/ActivityCard';


export default function App() {
  return (
    <View>
      <Logo/>
      <Searchbar pageType="home"/>
      <StatusBar style="auto" />
      <View style={styles.card}> 
        <ActivityCard  title="COYA Taco Night" date="Tuesday Nights 5-9pm" image="https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg" savedIcon={false}></ActivityCard>
      </View>
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
  card: {
    margin: 25
  }
});
