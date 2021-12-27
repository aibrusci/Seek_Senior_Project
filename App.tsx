import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ActivityCard from './Components/ActivityCard'

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Welcome to Seek!</Text>
        <StatusBar style="auto" />
          <ActivityCard title="COYA Taco Night" date="Tuesday Nights 5-9pm" image="https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg" savedIcon={false}></ActivityCard>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
