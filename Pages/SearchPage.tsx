import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import ActivityCard from '../Components/ActivityCard/ActivityCard';
import CardRow from '../Components/CardRow/CardRow';
import Searchbar from '../Components/SearchBar/Searchbar';
import Amplify , {API, graphqlOperation, Auth} from 'aws-amplify';
import { createEvent } from '../src/graphql/mutations';
import { listEvents } from '../src/graphql/queries';
import FilterRow from "../Components/Filter/FilterRow";
import FilterMenu from "../Components/Filter/FilterMenu";


export default function SearchPage() {
    const [filteredCards, setFilteredCards] = useState([]);
    const [activeFilters, setactiveFilters] = useState(Array());
    const [showBackArrow, setBackArrow] = useState(false);
    const [filters, setFilters] = useState(Array());
    const refRBSheet = useRef();
    const [cards, setCards] = useState([]);


    useEffect(() => {
        (async () => {
         const user = await Auth.currentAuthenticatedUser();
         const apiData = await API.graphql(graphqlOperation(listEvents));
         const cardData = apiData.data.listEvents.items;
         setCards(cardData);
         setFilteredCards(cardData);
         
         const newFilters = new Set();
         cardData.forEach((card) =>
             card.filterCategories.forEach((category) =>
                 newFilters.add(category)
             )
         );
         setFilters(Array.from(newFilters));

        })();
    
      }, [])


    useEffect(() => {
        if (!showBackArrow) {
            clearSelectedFilters();
        }
    }, [showBackArrow]);

    function updateCards(search: string) {
        setFilteredCards(
            cards.filter((item: any) => {
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
        setFilteredCards(
            cards.filter((item: any) => {
                if (
                    activeFilters.every((val) => {
                        if(item.filterCategories){
                          return item.filterCategories.includes(val);
                        }
                        else{
                          return false
                        }
                        
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

    return (
        <SafeAreaView style={styles.container}>
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
            {showBackArrow ? (
                <ScrollView
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                >
                    {filteredCards.map((c: any) => {
                        return (
                            <View style={styles.card}>
                                {console.log(c)}
                                <ActivityCard
                                    title={c.title}
                                    date={c.date}
                                    savedIcon={false}
                                    image={c.image}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            ) : (
                <ScrollView
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        {filters.map((category) => {
                            return (
                                <CardRow
                                    cards={cards.filter((item: any) => {
                                        if(item.filterCategories){
                                          if (
                                            item.filterCategories.includes(
                                                category
                                            )
                                        ) {
                                            return item;
                                        }
                                        }                                       
                                    })}
                                    category={String(category)}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
            )}
            <FilterMenu
                refRBSheet={refRBSheet}
                filters={filters}
                activeFilters={activeFilters}
                onFilterClick={onFilterClick}
                clearSelectedFilters={clearSelectedFilters}
            ></FilterMenu>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        marginLeft: 24,
        backgroundColor: "#fff",
        maxHeight: 700
    },
    card: {}
});
