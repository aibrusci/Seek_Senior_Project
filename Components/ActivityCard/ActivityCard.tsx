import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateEvent } from '../../src/graphql/mutations';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';

type ActivityCardProps = {
    id: String;
    title: String;
    date: String;
    image: string;
    savedIcon: boolean;
    savedUsers: any;
    username: string;
    refresh: any
    updateUsers: Function
  }

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
    const [saved, setSaved] = useState(props.savedIcon);

    const  updateSaved = async (search: any) => {
        // Will need to add post request here to save to their account later
        let currentSavedUsers = props.savedUsers

        if(saved){
          const index = currentSavedUsers.indexOf(props.username)
          currentSavedUsers.splice(index,1)
        }else {
          currentSavedUsers.push(props.username)
        }
        const updatedEvent = await API.graphql(
          graphqlOperation(updateEvent, {
            input: {id: props.id, savedUsers: currentSavedUsers},
          }),
        )
        setSaved(!saved);
        props.updateUsers(currentSavedUsers, props.id);
        props.savedIcon = saved
        props.refresh
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