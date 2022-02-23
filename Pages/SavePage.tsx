import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import Searchbar from '../Components/SearchBar/Searchbar';
import ActivityCard from '../Components/ActivityCard/ActivityCard';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import { listEvents } from '../src/graphql/queries';
import CardRow from '../Components/CardRow/CardRow';
import { Button } from 'react-native-elements';


export default function SavePage() {

  const [showBackArrow, setBackArrow] = useState(false);
  const [savedSeeks, setSavedSeeks] = useState([]);
  const [cards, setCards] = useState();
  const [userInfo, setUserInfo] = useState();
  const [refresh, setRefresh] = useState(true);

  function updateCards(search: string) {
    if (search === "") {
        setBackArrow(false);
    } else {
        setBackArrow(true);
    }
}

function refreshPage(){
  setRefresh(!refresh)
}
function updateUsers(newUsers: any, id:any){
  let cards2 = [... cards]
  cards2.map((card: any) => {
    if(card.id === id) {
        card.savedUsers = newUsers
    }
})
setCards(cards2)
}

useEffect(() => {
  let temp: any = []
  if (cards) {
    cards.map((card: any) => {
      if(card.savedUsers.includes(userInfo.username)) {
          temp.push(card)
      }
  })
  setSavedSeeks(temp)
  }
   
}, [cards])

useEffect(() => {
  (async () => {

   const user = await Auth.currentAuthenticatedUser();
   const apiData = await API.graphql(graphqlOperation(listEvents));
   const cardData = apiData.data.listEvents.items;
   setUserInfo(user)
   setCards(cardData);
   let temp: any = []
   cardData.map((card: any) => {
       if(card.savedUsers.includes(user.username)) {
           temp.push(card)
       }
   })
   setSavedSeeks(temp)
  })();

}, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
      <Searchbar 
            showBackArrow={showBackArrow}
            setBackArrow={setBackArrow}
            pageType={"save"}
            updateCards={updateCards}
        ></Searchbar>
      </View>
      <Text style={styles.savedSeeks}>
        Saved Seeks
      </Text>
      { (savedSeeks && savedSeeks.length == 0 ) ? 
        (<View>
          <Text style={styles.messageOne}>
            No saved seeks
          </Text>
        </View>)
         :
       (<View>
          <ScrollView
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >
              {/* {console.log(savedSeeks)} */}
              {savedSeeks.map((c: any) => {
                   return (<View style={styles.cardStyle}>
                   <ActivityCard
                       username={userInfo.username}
                       id={c.id}
                       title={c.title}
                       date={c.date}
                       savedIcon={c.savedUsers.includes(userInfo.username)}
                       savedUsers={c.savedUsers}
                       image={c.image}
                       refresh = {refreshPage}
                       updateUsers = {updateUsers}/>
                   </View>)
                })}
                <Button onPress={refreshPage}>

                </Button>
            </ScrollView>
        </View>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginLeft: 24,
    backgroundColor: "#fff",
    maxHeight: 800,
  },
  search: {
    marginLeft: -45,
    marginRight:-10
  },
  savedSeeks: {
    fontSize: 30,
    marginLeft: 0,
    marginTop: 20,
    color: "#FB7762"
  },
  messageOne: {
    marginTop: 150,
    fontSize: 20,
    // marginLeft: 80
  },
  messageTwo: {
    marginTop: 15,
    fontSize: 20
  },
  cardStyle: {
    width: 160,
    height: 265,
    margin: 5,
    marginLeft: 0,
    borderRadius: 15
}
});