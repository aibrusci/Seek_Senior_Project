import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import Searchbar from '../Components/SearchBar/Searchbar';
import ActivityCard from '../Components/ActivityCard/ActivityCard';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import { listEvents } from '../src/graphql/queries';
import { Button } from 'react-native-elements';

type SavePageComponentProps = {
  showBackArrow: Boolean;
  setBackArrow: Function;
  cards: any;
  userInfo: any;
  savedSeeks: any;
  updateCards: Function;
  updateUsers: Function;
};

const SavePage: React.FunctionComponent<SavePageComponentProps> = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
      <Searchbar 
            showBackArrow={props.showBackArrow}
            setBackArrow={props.setBackArrow}
            pageType={"save"}
            updateCards={props.updateCards}
        ></Searchbar>
      </View>
      <Text style={styles.savedSeeks}>
        Saved Seeks
      </Text>
      { (props.savedSeeks && props.savedSeeks.length == 0 ) ? 
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
              {props.savedSeeks.map((c: any) => {
                   return (<View style={styles.cardStyle}>
                   <ActivityCard
                       username={props.userInfo.username}
                       id={c.id}
                       title={c.title}
                       date={c.date}
                       savedIcon={c.savedUsers.includes(props.userInfo.username)}
                       savedUsers={c.savedUsers}
                       image={c.image}
                       updateUsers = {props.updateUsers}/>
                   </View>)
                })}
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

export default SavePage