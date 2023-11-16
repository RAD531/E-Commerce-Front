import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, inputOptions, formStyles as styles, defaultImg } from '../styles/styles';
import { Avatar, Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import PageHeading from '../components/PageHeading';
import mime from "mime";
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../redux/api/apiSlices/userApiSlice';
import { setAuthenticationStatus } from '../redux/slices/userSlice';

const SignUp = ({ navigation, route }) => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    const dispatch = useDispatch();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const disableBtn = !name || !email || !password || !address || !city || !country || !pinCode;

    const submitHandler = async () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("address", address);
        myForm.append("city", city);
        myForm.append("country", country);
        myForm.append("pinCode", pinCode);

        if (avatar !== "") {
            myForm.append("file", {
                uri: avatar,
                type: mime.getType(avatar),
                name: avatar.split("/").pop(),
            });
        }

        try {
            await registerUser(myForm).unwrap();
            dispatch(setAuthenticationStatus(true));
            navigation.navigate("profile");
        }
        catch (error) {
        }
    };


    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image);
        }
    }, [route.params]);

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

                {/* Heading */}
                <PageHeading text={"Sign Up"} />

                <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, elevation: 10, borderRadius: 10, backgroundColor: colors.color3 }}>

                    <View style={{ minHeight: 900 }}>
                        <Avatar.Image style={{ alignSelf: "center", backgroundColor: colors.color1 }} size={80} source={{ uri: avatar ? avatar : defaultImg }} />

                        <TouchableOpacity onPress={() => navigation.navigate("camera")}>
                            <Button textColor={colors.color1}>
                                Change Photo
                            </Button>
                        </TouchableOpacity>

                        <TextInput {...inputOptions} placeholder='Name' value={name} onChangeText={setName} />
                        <TextInput {...inputOptions} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />
                        <TextInput {...inputOptions} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
                        <TextInput {...inputOptions} placeholder='Address' value={address} onChangeText={setAddress} />
                        <TextInput {...inputOptions} placeholder='City' value={city} onChangeText={setCity} />
                        <TextInput {...inputOptions} placeholder='Country' value={country} onChangeText={setCountry} />
                        <TextInput {...inputOptions} placeholder='Pin Code' value={pinCode} onChangeText={setPinCode} />

                        <Button loading={isLoading} textColor={colors.color2} disabled={disableBtn} style={styles.btn} onPress={submitHandler}>
                            <Text>Sign Up</Text>
                        </Button>

                        <Text style={styles.or}>
                            OR
                        </Text>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("login")}>
                            <Text style={styles.link}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

            <Footer activeRoute='profile' />
        </>
    )
}

export default SignUp