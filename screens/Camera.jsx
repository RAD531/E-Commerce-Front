import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { Avatar } from 'react-native-paper';
import { colors, defaultStyle } from '../styles/styles';
import * as ImagePicker from "expo-image-picker";

const CameraComponent = ({ navigation, route }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);

    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult === false)
            return alert("Permission to access gallery is required");

        handlePictureExtract("ImagePicker");

    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const clickPicture = async () => {
        handlePictureExtract("Camera");
    };

    const handlePictureExtract = async (type) => {

        let data = null;
        let uri = null;

        if (type === "ImagePicker") {
            data = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
            uri = data.assets[0].uri;
        }

        else if (type === "Camera") {
            data = await camera.takePictureAsync();
            uri = data.uri;
        }

        else {
            return;
        }

        if (route.params?.newProduct) {
            return navigation.navigate("newproduct", { image: uri });
        }

        if (route.params?.updateProduct) {
            return navigation.navigate("productimages", { image: uri });
        }

        if (route.params?.updateProfile) {
            return navigation.navigate("profile", { image: uri });
        }

        else {
            return navigation.navigate("signup", { image: uri });
        }
    }

    if (hasPermission === null) return <View />

    if (hasPermission === false) return (
        <View style={defaultStyle}>
            <Text>No access to camera</Text>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio={"1:1"} ref={(e) => setCamera(e)} />
            <View style={{ flexDirection: "row", bottom: 10, width: "100%", justifyContent: "space-evenly", position: "absolute" }}>
                <MyIcon icon="image" handler={openImagePicker} />
                <MyIcon icon="camera" handler={clickPicture} />
                <MyIcon icon="camera-flip" handler={() => setType(prevType => prevType === CameraType.back ? CameraType.front : CameraType.back)} />
            </View>
        </View>
    )
}

const MyIcon = ({ icon, handler }) => (
    <TouchableOpacity onPress={handler}>
        <Avatar.Icon icon={icon} size={40} color={colors.color2} style={{ backgroundColor: colors.color1 }} />
    </TouchableOpacity>
);

export default CameraComponent