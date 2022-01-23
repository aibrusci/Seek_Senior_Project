import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Filter from "./Filter";

type FilterMenuProps = {
    filters: any;
    activeFilters: string[];
    onFilterClick: Function;
    clearSelectedFilters: Function;
    refRBSheet: any;
};

const FilterMenu: React.FC<FilterMenuProps> = (props) => {
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
            <RBSheet
                ref={props.refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.6)",
                        width: "100%",
                        alignSelf: "center"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        flex: 1,
                        flexDirection: "column",
                        borderRadius: 15
                    }
                }}
            >
                <Text style={styles.filterTitle}>Filters</Text>
                <ScrollView
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginLeft: 24
                    }}
                >
                    {props.filters.map((filter: string) => (
                        <View style={styles.filterMenuItem}>
                            <Filter
                                title={filter}
                                selected={props.activeFilters.includes(filter)}
                                onFilterClick={props.onFilterClick}
                            />
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={(ev) => props.clearSelectedFilters()}
                    >
                        <Text style={styles.buttonText}> Clear Filters </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => props.refRBSheet.current.close()}
                    >
                        <Text style={styles.buttonText}> Apply Filters </Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {},
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 25
    },
    filterMenuItem: {
        paddingBottom: 10
    },
    filterTitle: {
        fontSize: 15,
        paddingBottom: 5,
        alignSelf: "center",
        fontWeight: "500"
    },
    clearButton: {
        color: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: 1,
        borderRadius: 60,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        elevation: 2,
        height: 44,
        display: "flex",
        width: 120
    },
    applyButton: {
        justifyContent: "center",
        color: "#FB7762",
        backgroundColor: "#FB7762",
        borderColor: "#FFFFFF",
        borderRadius: 60,
        height: 44,
        display: "flex",
        width: 190
    },
    buttonText: {
        textAlign: "center"
    }
});
export default FilterMenu;
