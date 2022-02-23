import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet, Platform } from "react-native";
import BackArrow from "../BackArrow/BackArrow";
import MapIcon from "../MapIcon/MapIcon";
import ListIcon from "../ListIcon/ListIcon";

type SearchBarComponentProps = {
    pageType: String;
    updateCards: Function;
    showBackArrow: Boolean;
    setBackArrow: Function;
};

const Searchbar: React.FunctionComponent<SearchBarComponentProps> = (props) => {
    const [search, setSearch] = useState("");
    const [searchIcon, setSearchIcon] = useState(true);
    const [pageType, setPageType] = useState(props.pageType);

    const updateSearch = (search: any) => {
        setSearch(search);
        props.setBackArrow(true);

        if (search == "" && pageType == "home") {
            clearSearch();
        } else {
            props.updateCards(search);
        }
    };

    const onBackArrowClick = () => {
        if (pageType == "map") {
            setPageType("home");
            if (search == "") {
                switchToSearchIcon();
            }
        } else {
            clearSearch();
        }
    };

    const clearSearch = () => {
        if (pageType == "home") {
            switchToSearchIcon();
        }
        
        props.updateCards("");
        setSearch("");
    };

    const switchToHomePage = () => {
        setPageType("home");
        if (search == "") {
            switchToSearchIcon();
        }
    };

    const switchToMapPage = () => {
        setPageType("map");
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
                    {pageType == "home" && (
                        <MapIcon onButtonClick={switchToMapPage} />
                    )}
                    {pageType == "map" && (
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
    }
});

export default Searchbar;
