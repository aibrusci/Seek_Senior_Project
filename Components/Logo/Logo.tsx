 
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LogoIcon from './LogoIcon.png';

const Logo = (props: any) => {

  return (
    <View style={styles.view}>
        <TouchableOpacity onPress={props.onButtonClick}>
            <Image source={LogoIcon}/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 70,
    marginLeft: 30,
  },
});

export default Logo;