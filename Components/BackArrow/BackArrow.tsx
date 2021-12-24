import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import arrow from './backArrow.png';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const BackArrow = (props: any) => {

  return (
    <View style={styles.view}>
        <TouchableOpacity onPress={props.onButtonClick}>
          <SimpleLineIcon name="arrow-left" size={15} color="#000"/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
  },

});

export default BackArrow;