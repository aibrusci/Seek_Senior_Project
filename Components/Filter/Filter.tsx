import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

type FilterProps = {
    title: any;
    selected: Boolean;
    onFilterClick: Function;
};

const Filter: React.FC<FilterProps> = (props) => {
    let className;
    if (props.selected) {
        className = "filterSelected";
    } else {
        className = "filter";
    }

    return (
        <Pressable
            style={props.selected ? styles.filterSelected : styles.filter}
            onPress={(ev) => props.onFilterClick(props.title)}
        >
            <Text style={styles.title}>{props.title}</Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    filter: {
        height: 30,
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 12,
        justifyContent: "center"
    },
    filterSelected: {
        height: 30,
        backgroundColor: "rgba(251, 119, 98, 0.5)",
        borderColor: "#FB7762",
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 12,
        justifyContent: "center"
    },
    title: {
        fontWeight: "500",
        fontSize: 12,
        color: "#000000",
        padding: 5,
        zIndex: 999,
        fontFamily: "WorkSans-Regular"
    }
});
export default Filter;
