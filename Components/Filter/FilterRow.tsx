import React, { useState } from "react";
import { ScrollView, View, StyleSheet, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import Filter from "./Filter";

type FilterRowProps = {
    filters: any;
    activeFilters: string[];
    onFilterClick: Function;
    clearSelectedFilters: Function;
    openMenu: Function;
};

const FilterRow: React.FC<FilterRowProps> = (props) => {
    const parseToArray = (filters: string[]) => {
        const filterArray = [];
        let count = 0;
        for (let label of filters) {
            if (props.activeFilters.includes(label)) {
                filterArray.push(label);
            } else if (count < 4) {
                filterArray.push(label);
            }
            count++;
        }
        return filterArray;
    };
    const filterArray = parseToArray(props.filters);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "nowrap"
                }}
            >
                <Filter
                    title={
                        <View style={styles.iconStyle}>
                            <Icon
                                name="chevron-down"
                                type="feather"
                                size={24}
                            />
                        </View>
                    }
                    selected={false}
                    onFilterClick={props.openMenu}
                />
                {filterArray.map((filter: string) => (
                    <Filter
                        key={filter}
                        title={filter}
                        selected={props.activeFilters.includes(filter)}
                        onFilterClick={props.onFilterClick}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 5,
        marginBottom: 15
    },
    iconStyle: {
        alignContent: "flex-end",
        alignSelf: "center",
        marginLeft: -10,
        marginTop: -15,
        padding: 5,
        fontWeight: "100"
    }
});
export default FilterRow;
