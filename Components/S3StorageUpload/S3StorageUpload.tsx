import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import awsconfig from "../../src/aws-exports";

Amplify.configure({
    ...awsconfig,
    Storage: {
        AWSS3: {
            bucket: "seekimagebucket",
            region: "us-east-1"
        }
    }
});

export default function S3StorageUpload() {
    const [image, setImage] = useState(null);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        (async () => {
            if (Platform.OS === "ios") {
                const cameraRollStatus =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraStatus =
                    await ImagePicker.requestCameraPermissionsAsync();
                if (
                    cameraRollStatus.status !== "granted" ||
                    cameraStatus.status !== "granted"
                ) {
                    alert(
                        "Sorry, we need these permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            aspect: [4, 3],
            quality: 1
        });

        handleImagePicked(result);
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            if (pickerResult.cancelled) {
                alert("Upload cancelled");
                return;
            } else {
                setPercentage(0);
                const img = await fetchImageFromUri(pickerResult.uri);
                const uploadUrl = await uploadImage("demo.jpg", img);
                downloadImage(uploadUrl);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed");
        }
    };

    const uploadImage = (filename, img) => {
        Auth.currentCredentials();
        return Storage.put(filename, img, {
            level: "public",
            contentType: "image/jpeg",
            progressCallback(progress) {
                setLoading(progress);
            }
        })
            .then((response) => {
                return response.key;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            });
    };

    const setLoading = (progress) => {
        const calculated = parseInt((progress.loaded / progress.total) * 100);
        updatePercentage(calculated); // due to s3 put function scoped
    };

    const updatePercentage = (number) => {
        setPercentage(number);
    };

    const downloadImage = (uri) => {
        Storage.get(uri)
            .then((result) => setImage(result))
            .catch((err) => console.log(err));
    };

    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };
    return (
        <View style={styles.container}>
            {percentage !== 0 && (
                <Text style={styles.percentage}>{percentage}%</Text>
            )}
            {image && (
                <View>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 250, height: 250 }}
                    />
                </View>
            )}
            <TouchableOpacity style={styles.roundButtonTop} onPress={pickImage}>
                <Image
                    source={require("../../assets/add-image.png")}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        paddingTop: 55,
                        marginLeft: 2,
                        alignContent: "flex-start"
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
        marginHorizontal: 15
    },
    percentage: {
        marginBottom: 10
    },
    result: {
        paddingTop: 5
    },
    info: {
        textAlign: "center",
        marginBottom: 20
    },
    roundButtonTop: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10
    }
});
