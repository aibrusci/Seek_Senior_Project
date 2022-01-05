import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, SafeAreaView } from 'react-native';
import ActivityCard from '../Components/ActivityCard/ActivityCard';
import CardRow from '../Components/CardRow/CardRow';

const cardsExample = [
  {id: 1, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
  {id: 2, title:"Libertine Comedy Night", date:"Wednesday Nights 5-9pm", image:"https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg", savedIcon:true },
  {id: 3, title:"Woodstock's Trivia Night", date:"Monday Nights 9-11pm", image:"https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png", savedIcon:true },
  {id: 4, title:"Libertine Comedy Night", date:"Wednesday Nights 5-9pm", image:"https://c8.alamy.com/comp/K70N7F/inside-the-libertine-brewing-companys-brew-pub-in-san-luis-obispo-K70N7F.jpg", savedIcon:true },
  {id: 5, title:"Woodstock's Trivia Night", date:"Monday Nights 9-11pm", image:"https://slochamber.org/wp-content/uploads/2018/08/Woodstocks-Pizza-Backyard-3_1024.png", savedIcon:true },
  {id: 6, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
  {id: 6, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
  {id: 6, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false },
  {id: 6, title:"COYA Taco Night", date:"Tuesday Nights 5-9pm", image:"https://s3-media0.fl.yelpcdn.com/bphoto/kkR5Sb3WeGAAVRLC6dAIOQ/o.jpg", savedIcon:false }
]

export default function SearchPage() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
                pagingEnabled 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  
                }}
            >
                    {cardsExample.map(c => {
                        return (
                          <View style={styles.card}>
                            <ActivityCard title={c.title} date={c.date} savedIcon={false} image={c.image} />
                        </View>
                        )
                    })}
        </ScrollView>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginLeft: 24,
    backgroundColor: '#fff',
    maxHeight: 550, 
  },
  card: {
    
  }
});
