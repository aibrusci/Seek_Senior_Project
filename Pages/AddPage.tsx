import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Modal
} from "react-native";
import { useForm, useController, Controller } from "react-hook-form";
import { Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking, Platform } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import S3StorageUpload from "../Components/S3StorageUpload/S3StorageUpload";
import {
    useFonts,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold
} from "@expo-google-fonts/work-sans";
import Logo from "../Components/Logo/Logo";

type Event = {
    id: String;
    title: String;
    date: String;
    image: string[];
    savedIcon: Boolean;
    description: String;
    time: String;
    filterCategories: [String];
    location: String;
    category: String;
    price: string;
    website: string;
    rating: [number];
};

const AddPage = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({
        WorkSans_300Light,
        WorkSans_400Regular,
        WorkSans_500Medium,
        WorkSans_600SemiBold,
        WorkSans_700Bold
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            eventName: "",
            eventContact: "",
            Date: "",
            Time: "",
            Website: "",
            Description: "",
            Address: "",
            Price: "",
            Image: ""
        }
    });
    const onSubmit = (data) => console.log(data);

    if (!fontsLoaded) {
        return <Logo />;
    } else {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.AddEventTitle}>Add Event</Text>

                <Text style={styles.AddEventLabel}>Event Name</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Title"
                        />
                    )}
                    name="eventName"
                />
                {errors.eventName && (
                    <Text style={styles.warning}>Event name is required.</Text>
                )}

                <Text style={styles.AddEventLabel}>
                    Event Contact Information
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            accessibilityLabel="hello"
                            placeholder="Phone or Email"
                        />
                    )}
                    name="eventContact"
                />
                {errors.eventContact && (
                    <Text style={styles.warning}>
                        Contact information is required.
                    </Text>
                )}

                <Text style={styles.AddEventLabel}>Date</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="MM/DD/YYYY"
                        />
                    )}
                    name="Date"
                />
                {errors.Date && (
                    <Text style={styles.warning}>Date is required.</Text>
                )}

                <Text style={styles.AddEventLabel}>Time</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="HH:MM AM/PM"
                        />
                    )}
                    name="Time"
                />
                {errors.Time && (
                    <Text style={styles.warning}>Time is required.</Text>
                )}

                <Text style={styles.AddEventLabel}>
                    Additional Date Information
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: false
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Additional Description for Recurring Event"
                        />
                    )}
                    name="Date"
                />

                <Text style={styles.AddEventLabel}>Website</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="URL"
                        />
                    )}
                    name="Website"
                />
                {errors.Website && (
                    <Text style={styles.warning}>Website is required.</Text>
                )}

                <Text style={styles.AddEventLabel}>Description</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Describe the event"
                        />
                    )}
                    name="Description"
                />
                {errors.Description && (
                    <Text style={styles.warning}>
                        Description is required..
                    </Text>
                )}

                <Text style={styles.AddEventLabel}>Address</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Address"
                        />
                    )}
                    name="Address"
                />
                {errors.Address && (
                    <Text style={styles.warning}>Address is required.</Text>
                )}

                <Text style={styles.AddEventLabel}>Price</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Free, $, $$, or $$$"
                        />
                    )}
                    name="Price"
                />
                {errors.Price && (
                    <Text style={styles.warning}>Price is required.</Text>
                )}

                <Text style={styles.AddEventLabel}>Image</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="Image"
                />

                <Button
                    // style={styles.EventButton}
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    buttonStyle={styles.EventButton}
                />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        paddingHorizontal: 10,
        height: 30,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#FB7762",
        fontFamily: "WorkSans_400Regular"
    },
    AddEventTitle: {
        fontFamily: "WorkSans_700Bold",
        fontSize: 36,
        lineHeight: 50,
        color: "#FB7762",
        textAlign: "left"
    },
    AddEventLabel: {
        fontFamily: "WorkSans_400Regular",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "left",
        color: "#FB7762"
    },
    warning: {
        fontFamily: "WorkSans_400Regular",
        fontSize: 16,
        marginTop: -20,
        marginBottom: 10,
        textAlign: "left",
        color: "red"
    },
    EventButton: {
        color: "#FB7762",
        backgroundColor: "#FB7762",
        borderRadius: 6,
        width: "100%",
        alignSelf: "center",
        marginBottom: 30
    }
});
export default AddPage;
