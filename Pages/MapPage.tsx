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

import { markers, mapStandardStyle} from '../data/cardsExample';
import Searchbar from '../Components/SearchBar/Searchbar';
import FilterRow from "../Components/Filter/FilterRow";
import FilterMenu from "../Components/Filter/FilterMenu";

import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

type CardType = {
  title: string;
  date: string;
  image: string;
  savedIcon: boolean;
  filterCategories: string[];
};

   export default function MapPage(){
     const theme = useTheme();
   
     const initialMapState = {
       markers,
       categories: [
         { 
           name: 'Fastfood Center', 
           icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
         },
         {
           name: 'Restaurant',
           icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
         },
         {
           name: 'Dineouts',
           icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
         },
         {
           name: 'Snacks Corner',
           icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
         },
         {
           name: 'Hotel',
           icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
         },
     ],
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

    const [filteredMarkers, setfilteredMarkers] = useState(markers);
    const [activeFilters, setactiveFilters] = useState(Array());
    const [showBackArrow, setBackArrow] = useState(false);
    const [filters, setFilters] = useState(_getAllFilters(markers));
    const refRBSheet = useRef();

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
      mapAnimation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= state.markers.length) {
          index = state.markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
        const regionTimeout = setTimeout(() => {
          if( mapIndex !== index ) {
            mapIndex = index;
            const coordinate = state.markers[index];
            _map.current.animateToRegion(
              {
                latitude: coordinate.coordinate.latitude - .006,
                longitude: coordinate.coordinate.longitude,
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

    const interpolations = state.markers.map((marker, index) => {
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
      {console.log("PRESSED")}
      const markerID = mapEventData._targetInst.return.key;

      let x = (markerID * CARD_WIDTH) + (markerID * 20); 
      x = x - SPACING_FOR_CARD_INSET;
      

      _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    }

    function updateCards(search: string) {
        setfilteredMarkers(
            markers.filter((item: any) => {
                if (item.title.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            })
        );
        if (search === "") {
            setBackArrow(false);
        } else {
            setBackArrow(true);
        }
    }
    const onFilterClick = (filter: string) => {
        const active = _addRemoveFilter(filter, activeFilters);
        setactiveFilters(active);
        filters.sort((a: any, b: any) => {
            if (activeFilters.includes(a)) {
                return -1;
            }
            if (activeFilters.includes(b)) {
                return 1;
            }
            return 0;
        });
        setfilteredMarkers(
            markers.filter((item: any) => {
                if (
                    activeFilters.every((val) => {
                        return item.filterCategories.includes(val);
                    })
                ) {
                    return item;
                }
            })
        );
        if (activeFilters.length) {
            setBackArrow(true);
        } else {
            setBackArrow(false);
        }
    };
    useEffect(() => {
        if (!showBackArrow) {
            clearSelectedFilters();
        }
    }, [showBackArrow]);

    const clearSelectedFilters = () => {
        setactiveFilters([]);
        setBackArrow(false);
    };

    const _addRemoveFilter = (filter: string, activeFilters: any[]) => {
        const index = activeFilters.indexOf(filter);
        if (index > -1) {
            activeFilters.splice(index, 1);
        } else {
            activeFilters.push(filter);
        }
        return activeFilters;
    };

    function _getAllFilters(cards: CardType[]) {
        const newFilters = new Set();
        cards.forEach((card) =>
            card.filterCategories.forEach((category) =>
                newFilters.add(category)
            )
        );
        return Array.from(newFilters);
    }
   
     return (
       <View style={styles.container}>
         <View style={styles.searchBox}>
          <Searchbar
            showBackArrow={showBackArrow}
            setBackArrow={setBackArrow}
            pageType={"home"}
            updateCards={updateCards}
          ></Searchbar>
            <FilterRow
              filters={filters}
              activeFilters={activeFilters}
              onFilterClick={onFilterClick}
              clearSelectedFilters={clearSelectedFilters}
              openMenu={() => refRBSheet.current.open()}
            ></FilterRow>
          </View>
         <MapView
           ref={_map}
           initialRegion={state.region}
           style={styles.map}
           provider={PROVIDER_GOOGLE}
         >
           {filteredMarkers.map((marker, index) => {
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
                  <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
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
              filters={filters}
              activeFilters={activeFilters}
              onFilterClick={onFilterClick}
              clearSelectedFilters={clearSelectedFilters}
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
              {filteredMarkers.map((marker, index) =>
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
         {/* <View style={styles.searchBox}>
           <TextInput 
             placeholder="Search here"
             placeholderTextColor="#000"
             autoCapitalize="none"
             style={{flex:1,padding:0}}
           />
           <Ionicons name="ios-search" size={20} />
         </View>
         <ScrollView
           horizontal
           scrollEventThrottle={1}
           showsHorizontalScrollIndicator={false}
           height={50}
           style={styles.chipsScrollView}
           contentInset={{ // iOS only
             top:0,
             left:0,
             bottom:0,
             right:20
           }}
           contentContainerStyle={{
             paddingRight: Platform.OS === 'android' ? 20 : 0
           }}
         >
           {state.categories.map((category, index) => (
             <TouchableOpacity key={index} style={styles.chipsItem}>
               {category.icon}
               <Text>{category.name}</Text>
             </TouchableOpacity>
           ))}
         </ScrollView>
         <Animated.ScrollView
           ref={_scrollView}
           horizontal
           pagingEnabled
           scrollEventThrottle={1}
           showsHorizontalScrollIndicator={false}
           snapToInterval={CARD_WIDTH + 20}
           snapToAlignment="center"
           style={styles.scrollView}
           contentInset={{
             top: 0,
             left: SPACING_FOR_CARD_INSET,
             bottom: 0,
             right: SPACING_FOR_CARD_INSET
           }}
           contentContainerStyle={{
             paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
           }}
           onScroll={Animated.event(
             [
               {
                 nativeEvent: {
                   contentOffset: {
                     x: mapAnimation,
                   }
                 },
               },
             ],
             {useNativeDriver: true}
           )}
         >
           {state.markers.map((marker, index) =>(
             <View style={styles.card} key={index}>
               <Image 
                 source={'../assets/map-marker.png'}
                 style={styles.cardImage}
                 resizeMode="cover"
               />
               <View style={styles.textContent}>
                 <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                 <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                 <View style={styles.button}>
                   <TouchableOpacity
                     onPress={() => {}}
                     style={[styles.signIn, {
                       borderColor: '#FF6347',
                       borderWidth: 1
                     }]}
                   >
                     <Text style={[styles.textSign, {
                       color: '#FF6347'
                     }]}>Order Now</Text>
                   </TouchableOpacity>
                 </View>
               </View>
             </View>
           ))}
         </Animated.ScrollView>
       </View> */}
     {/* );
   }; */}
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
     },
     map: {
       height: '100%'
     },
     searchBox: {
      //  position:'absolute', 
       paddingTop: 20,
       paddingLeft: 20,
      //  flexDirection:"row",
       backgroundColor: '#fff',
      //  width: '90%',
      //  alignSelf:'center',
      //  borderRadius: 5,
      //  padding: 10,
      //  shadowColor: '#ccc',
      //  shadowOffset: { width: 0, height: 3 },
      //  shadowOpacity: 0.5,
      //  shadowRadius: 5,
      //  elevation: 10,
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
       // padding: 10,
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
       // marginTop: 5,
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