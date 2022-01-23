import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, SafeAreaView } from 'react-native';
import ActivityCard from '../Components/ActivityCard/ActivityCard';
import CardRow from '../Components/CardRow/CardRow';
import Searchbar from '../Components/SearchBar/Searchbar';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import { createEvent } from '../src/graphql/mutations';
import { listEvents } from '../src/graphql/queries';

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
  

  const [cards, setCards] = useState([]);

  useEffect(() => {
    getEvents()
    }, [])

  const getEvents = async () => {
    try {
        //const user = await Auth.currentAuthenticatedUser();
        const apiData = await API.graphql(graphqlOperation(listEvents))
        const cardData = apiData.data.listEvents.items
        setCards(cardData)
      } catch (e) {
        console.log(e.message);
      }
  }

  
    const [filteredCards, setFilteredCards] = useState(cardsExample);
  
    function updateCards( search : string ){
        setFilteredCards(cardsExample.filter((item : any) => {
          if (item.title.toLowerCase().includes(search.toLowerCase())){
            return item;
          }
        }))
    }
  
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar pageType={"home"} updateCards={updateCards}></Searchbar>
      {console.log(cards)}
        <ScrollView
                pagingEnabled 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  
                }}
            >
                    {/* {filteredCards.map(c => {
                        return (
                          <View style={styles.card}>
                            <ActivityCard title={c.title} date={c.date} savedIcon={false} image={c.image} />
                        </View>
                        )
                    })} */}
                     {cards.map(c => {
                        return (
                          <View style={styles.card}>
                            <ActivityCard title={c.title} date={c.date} savedIcon={c.savedIcon} image={c.image} />
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
    maxHeight: 700, 
  },
  card: {
    
  }
});

