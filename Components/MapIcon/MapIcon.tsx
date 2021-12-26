import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const BackArrow = (props: any) => {

  return (
    <View style={styles.view}>
        <TouchableOpacity onPress={props.onButtonClick}>
            <SimpleLineIcon style={styles.iconView} name="map" size={25} color="#000"/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
  },
  iconView: {
    margin: 0,
    marginTop: 20,
    marginRight: 60,
    marginLeft: 0
  }
});

export default BackArrow;