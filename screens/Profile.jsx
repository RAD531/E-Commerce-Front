import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultImg, defaultStyle, formHeading } from '../styles/styles';
import { Avatar, Button } from 'react-native-paper';
import ButtonBox from '../components/ButtonBox';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import PageHeading from '../components/PageHeading';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../redux/actions/userActions';
import { useMessageAndErrorGeneral, useMessageAndErrorUser } from '../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
import mime from "mime";
import { updateProfilePicture } from '../redux/actions/profileActions';

const Profile = ({ navigation, route }) => {

    const { user } = useSelector((state) => state.user);

    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar.url : defaultImg);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const loading = useMessageAndErrorUser(navigation, dispatch, "login");

    const logoutHandler = () => {
        dispatch(logout());
    };

    const navigateHandler = (text) => {
        switch (text) {
            case "Admin":
                navigation.navigate("adminpanel");
                break;
            case "Orders":
                navigation.navigate("orders");
                break;
            case "Profile":
                navigation.navigate("updateprofile");
                break;
            case "Password":
                navigation.navigate("changepassword");
                break;
            case "Sign Out":
                logoutHandler();
                break;
        }
    };

    const loadingPic = useMessageAndErrorGeneral(dispatch, "profile", null, null, loadUser);

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image);

            // dispatch updatePic here
            const myForm = new FormData();
            myForm.append("file", {
                uri: route.params.image,
                type: mime.getType(route.params.image),
                name: route.params.image.split("/").pop()
            });

            dispatch(updateProfilePicture(myForm));
        }

        dispatch(loadUser());
    }, [route.params, dispatch, isFocused]);

    return (
        <>
            <View style={defaultStyle}>

                {/* Heading */}
                <PageHeading text={"Profile"} paddingTopStyle={20} />

                {/* Loading */}
                {
                    loading ? <Loader /> : (
                        <>
                            <View style={styles.container}>
                                <Avatar.Image source={{ uri: avatar }} size={100} style={{ backgroundColor: colors.color1 }} />
                                <TouchableOpacity onPress={() => navigation.navigate("camera", { updateProfile: true })} disabled={loadingPic}>
                                    <Button disabled={loadingPic} loading={loadingPic} textColor={colors.color1}>
                                        Change Photo
                                    </Button>
                                </TouchableOpacity>
                                <Text style={styles.name}>
                                    {user?.name}
                                </Text>
                                <Text style={{ fontWeight: "300", color: colors.color2 }}>
                                    {user?.email}
                                </Text>
                            </View>

                            <View>
                                <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between" }}>
                                    <ButtonBox handler={navigateHandler} text={"Orders"} icon={"format-list-bulleted-square"} />
                                    {
                                        user?.role === "admin" && (
                                            <ButtonBox handler={navigateHandler} icon={"view-dashboard"} text={"Admin"} reverse={true} />
                                        )
                                    }
                                    <ButtonBox handler={navigateHandler} text={"Profile"} icon={"pencil"} />
                                </View>

                                <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-evenly" }}>
                                    <ButtonBox handler={navigateHandler} text={"Password"} icon={"pencil"} />
                                    <ButtonBox handler={navigateHandler} icon={"exit-to-app"} text={"Sign Out"} />
                                </View>
                            </View>
                        </>
                    )
                }

            </View>

            <Footer />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 7,
        backgroundColor: colors.color3,
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        color: colors.color2
    }
});

export default Profile