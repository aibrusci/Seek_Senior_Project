import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  TouchableHighlight,
} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Searchbar from '../Components/SearchBar/Searchbar';
import FilterRow from "../Components/Filter/FilterRow";
import FilterMenu from "../Components/Filter/FilterMenu";

import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

type MapPageComponentProps = {
  filteredCards: any;
  activeFilters: any;
  showBackArrow: Boolean;
  setBackArrow: Function;
  filters: any;
  cards: any;
  userInfo: any;
  updateUsers: Function;
  updateCards: Function;
  onFilterClick: Function;
  clearSelectedFilters: Function;
  _addRemoveFilter: Function;
  savedSeeks: any;
};

const MapPage: React.FunctionComponent<MapPageComponentProps> = (
  props
) => {
     const theme = useTheme();
   
     const initialMapState = {
       region: {
          latitude: 35.2783,
          longitude: -120.6590,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
       },
     };
   
    const [state, setState] = React.useState(initialMapState);

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    const refRBSheet = useRef();

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
      mapAnimation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= props.cards.length) {
          index = props.cards.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
        const regionTimeout = setTimeout(() => {
          if( mapIndex !== index ) {
            mapIndex = index;
            const coordinate = props.cards[index].coordinate;
            _map.current.animateToRegion(
              {
                latitude: coordinate[0] - .01,
                longitude: coordinate[1],
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
        return () => clearTimeout(regionTimeout);
      });
    });

    const interpolations = props.cards.map((marker: any, index: any) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
  
      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp"
      });
  
        return { scale };
      });
    
    const onMarkerPress = (mapEventData : any) => {
      {console.log("PRESSED")} //this onPress function has a bug.
      const markerID = mapEventData._targetInst.return.key;

      let x = (markerID * CARD_WIDTH) + (markerID * 20); 
      x = x - SPACING_FOR_CARD_INSET;
      

      _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    }
   
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
      <Searchbar
        showBackArrow={props.showBackArrow}
        setBackArrow={props.setBackArrow}
        pageType={"map"}
        updateCards={props.updateCards}
      ></Searchbar>
        <FilterRow
          filters={props.filters}
          activeFilters={props.activeFilters}
          onFilterClick={props.onFilterClick}
          clearSelectedFilters={props.clearSelectedFilters}
          openMenu={() => refRBSheet.current.open()}
        ></FilterRow>
      </View>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        {props.filteredCards.map((marker: any, index: any) => {
          const scaleStyle={
            transform: [
              {
                scale: interpolations[index].scale,
              }
            ]
          }
          return (
            <View style={styles.container}>
            <MapView
            ref={_map}
            initialRegion={state.region}
            provider={PROVIDER_GOOGLE}>
              <Marker key={index} coordinate={{latitude: marker.coordinate[0], longitude:marker.coordinate[1]}} onPress={(e) => onMarkerPress(e)}>
                {/* <Callout tooltip>
                  <TouchableHighlight onPress={() => console.log("yo")}> */}
                    <Animated.View style={[styles.markerWrap]}>
                      <Animated.Image
                        source={require('../assets/map-marker.png')}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  {/* </TouchableHighlight>
                </Callout> */}
              </Marker>
            </MapView>
          </View>
          );
        })}
        </MapView>
        <FilterMenu
          refRBSheet={refRBSheet}
          filters={props.filters}
          activeFilters={props.activeFilters}
          onFilterClick={props.onFilterClick}
          clearSelectedFilters={props.clearSelectedFilters}
        ></FilterMenu>
        <Animated.ScrollView
        ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  }
                }
              }
            ],
            {useNativeDriver: true}
          )}
        >
          {props.filteredCards.map((marker: any, index: any) =>
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode='cover'
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              </View>
            </View>
          )}
        </Animated.ScrollView>
      </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%'
  },
  searchBox: {
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 25,
    height: 35,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});

export default MapPage;