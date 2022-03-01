import { API, graphqlOperation } from "aws-amplify";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Image
} from "react-native";
import { Rating, AirbnbRating } from "react-native-elements";
import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";
import { updateEvent } from "../../src/graphql/mutations";

type RatingsComponentProps = {
    rating: number[];
    id: String;
};

const star = require("../../assets/FilledStar.png");

const Ratings: React.FunctionComponent<RatingsComponentProps> = (props) => {
    const updateRating = async (rating: number) => {
        // Will need to add post request here to save to their account later
        let currentRating = props.rating;
        currentRating.push(rating);

        const updatedEvent = await API.graphql(
            graphqlOperation(updateEvent, {
                input: { id: props.id, rating: currentRating }
            })
        );
        console.log(currentRating);
    };

    return (
        <View>
            <AirbnbRating
                starImage={star}
                onFinishRating={updateRating}
                starContainerStyle={{
                    marginTop: -28.5,
                    marginLeft: -14
                }}
                reviews={[]}
                size={18}
                selectedColor="white"
                defaultRating={
                    props.rating
                        ? props.rating.reduce((a, b) => a + b, 0) /
                          props.rating.length
                        : 0
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Ratings;
