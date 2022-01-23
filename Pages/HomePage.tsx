import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, SafeAreaView } from 'react-native';
import ActivityCard from './../Components/ActivityCard/ActivityCard';
import CardRow from './../Components/CardRow/CardRow';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import { createEvent } from '../src/graphql/mutations';
import { listEvents } from '../src/graphql/queries';

const cardsExample = [{id: 1, category: "Happy Hour", cards: [
  {id: 1, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
  {id: 2, title:"Libertine Comedy Night", date:"Wednesday Nights 5-9pm", image:"https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg", savedIcon:true },
  {id: 3, title:"Woodstock's Trivia Night", date:"Monday Nights 9-11pm", image:"https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png", savedIcon:true },
]},
{id: 2, category: "Winter Themed", cards: [
  {id: 2, title:"Libertine Comedy Night", date:"Wednesday Nights 5-9pm", image:"https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg", savedIcon:true },
  {id: 3, title:"Woodstock's Trivia Night", date:"Monday Nights 9-11pm", image:"https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png", savedIcon:true },
  {id: 1, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
  {id: 1, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false }
]},
{id: 3, category: "Date Night", cards: [
    {id: 3, title:"Woodstock's Trivia Night", date:"Monday Nights 9-11pm", image:"https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png", savedIcon:true },
  {id: 2, title:"Libertine Comedy Night", date:"Wednesday Nights 5-9pm", image:"https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg", savedIcon:true },
  {id: 5, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
]}]




export default function HomePage() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
                pagingEnabled 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.card}> 
                    {cardsExample.map(c => {
                        return (<CardRow cards={c.cards} category={c.category}/>)
                    })}
                 </View>
        </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    maxHeight: 600,
  },
  card: {
    margin: 25,
  }
});
