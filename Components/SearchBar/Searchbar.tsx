import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet, Platform } from "react-native";
import BackArrow from "../BackArrow/BackArrow";
import MapIcon from "../MapIcon/MapIcon";
import ListIcon from "../ListIcon/ListIcon";
import { useNavigation } from "@react-navigation/native";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";

type SearchBarComponentProps = {
    pageType: String;
    updateCards: Function;
    showBackArrow: Boolean;
    setBackArrow: Function;
};

const Searchbar: React.FunctionComponent<SearchBarComponentProps> = (props) => {
    const [search, setSearch] = useState("");
    const [searchIcon, setSearchIcon] = useState(true);
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        WorkSans_400Regular
    });

    const updateSearch = (search: any) => {
        setSearch(search);
        props.setBackArrow(true);

        if (search == "" && props.pageType == "home") {
            clearSearch();
        } else {
            props.updateCards(search);
        }
    };

    const onBackArrowClick = () => {
        if (props.pageType == "map") {
            navigation.navigate("HomePage", {
                screen: "HomePage",
                ...props
            })
            if (search == "") {
                switchToSearchIcon();
            }
        } else {
            clearSearch();
        }
    };

    const clearSearch = () => {
        if (props.pageType == "home") {
            switchToSearchIcon();
        }
        props.updateCards("");
        setSearch("");
    };

    const switchToHomePage = () => {
        navigation.navigate("HomePage", {
            screen: "HomePage",
            ...props
        })
        if (search == "") {
            switchToSearchIcon();
        }
    };

    const switchToMapPage = () => {
        navigation.navigate("MapPage", {
            screen: "MapPage",
            ...props
        })
        props.setBackArrow(true);
    };

    const switchToSearchIcon = () => {
        props.setBackArrow(false);
        setSearchIcon(true);
    };

    return (
        <View>
            <View style={styles.inline}>
                <View style={styles.searchView}>
                    <SearchBar
                        styles={styles.search}
                        placeholder="Search..."
                        onChangeText={updateSearch}
                        value={search}
                        clearIcon
                        lightTheme
                        platform={Platform.OS}
                        onCancel={clearSearch}
                        onClear={clearSearch}
                        searchIcon={
                            props.showBackArrow ? (
                                <BackArrow onButtonClick={onBackArrowClick} />
                            ) : (
                                !props.showBackArrow
                            )
                        }
                    />
                </View>
                <View>
                    {props.pageType == "home" && (
                        <MapIcon onButtonClick={switchToMapPage} />
                    )}
                    {props.pageType == "map" && (
                        <ListIcon onButtonClick={switchToHomePage} />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchView: {
        margin: 0,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 35
    },

    inline: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    search: {
        fontFamily: "WorkSans_400Regular"
    }
});

export default Searchbar;
