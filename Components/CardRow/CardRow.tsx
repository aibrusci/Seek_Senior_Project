import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActivityCard from '../../Components/ActivityCard/ActivityCard';

type CardRowProps = {
    category: String;
    cards: [];
  }
type ActivityCardType = {
    title: String;
    date: String;
    image: string;
    savedIcon: boolean;
  }


const CardRow: React.FC<CardRowProps> = (props) => {
    _renderViews = (views: ActivityCardType[]): JSX.Element[] => {
    const { cardStyle } = styles

    return views.map(card => {
      return (
        <View style={styles.cardStyle}>
          <ActivityCard title={card.title} date={card.date} savedIcon={false} image={card.image} />
        </View>
      )
    })
  }

  return (
    <View style={styles.category}>
        <Text style={styles.categoryName}>{props.category}</Text>
          <ScrollView
            horizontal 
            pagingEnabled 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {_renderViews(props.cards)}
            
          </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
    category: {
    },
    cardStyle: {
        width: 160,
        height: 265,
        margin: 5,
        borderRadius: 15,
    },
    categoryName: {
        paddingLeft: 5,
        display: 'flex',
        flexDirection: 'column',
        fontWeight: '500'
    },
});
export default CardRow;