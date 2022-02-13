import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, SafeAreaView } from 'react-native';

export default function UserPage() {

  return (
    <SafeAreaView style={styles.container}>
        <Text>User Page</Text>
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