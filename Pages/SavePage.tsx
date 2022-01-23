import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';


export default function HomePage() {

  return (
    <SafeAreaView style={styles.container}>
        <Text>Save Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    maxHeight: 800,
  }
});