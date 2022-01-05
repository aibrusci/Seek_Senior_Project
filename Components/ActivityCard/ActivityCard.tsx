import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type ActivityCardProps = {
    title: String;
    date: String;
    image: string;
    savedIcon: boolean;
  }

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
    const [saved, setSaved] = useState(props.savedIcon);

    const updateSaved = (search: any) => {
        // Will need to add post request here to save to their account later
        setSaved(!saved);
    };

  return (
    <View style={styles.fullCard}>
            <Image style={styles.image} source={{uri: props.image}}></Image>
            <View style={styles.CardFooter}>
                <View style={styles.cardText}>
                    <Text style={styles.activityName}>{props.title}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
                <Button buttonStyle={{
                        backgroundColor: '#FFF',
                        }} 
                        title="" 
                        onPress={updateSaved} 
                        icon={saved? <FontAwesome name="bookmark" size={24} color="#FB7762" /> : <FontAwesome name="bookmark-o" size={24} color="#FB7762" />}>
                </Button>
            </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fullCard: {
    width: 160,
    maxHeight: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 10,
    marginLeft: 0,
  },
  cardText: {
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },
  CardFooter: {
    display: 'flex',
    flexDirection: 'row',   
    justifyContent: 'space-between',
  },
  activityName: {
    fontWeight: '500',
    fontSize: 12,
    color: '#000000',
    paddingTop: 5,
  },
  date: {
    fontSize: 10,
    lineHeight: 14,
    color: '#000000',
  },
  image: {
    width: 160,
    height: 191,
    borderRadius: 5,
  },
  iconButton: {
      backgroundColor: '#FFF',
      color: '#fff'
  }
});
export default ActivityCard;