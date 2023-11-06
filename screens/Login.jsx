import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import PageHeading from '../components/PageHeading';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/actions/userActions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, message, error, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            navigation.navigate("profile");
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearError",
            });
        }
    }, [error, message, dispatch]);

    const submitHandler = () => {
        dispatch(login(email, password));
    };

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

                {/* Heading */}
                <PageHeading text={"Login"} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <TextInput {...inputOptions} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />
                        <TextInput {...inputOptions} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />

                        <TouchableOpacity onPress={() => navigation.navigate("forgetpassword")} activeOpacity={0.8}>
                            <Text style={styles.forget}>Forgot Password</Text>
                        </TouchableOpacity>

                        <Button loading={loading} textColor={colors.color2} disabled={email === "" || password === ""} style={styles.btn} onPress={submitHandler}>
                            <Text>Login</Text>
                        </Button>

                        <Text style={styles.or}>
                            OR
                        </Text>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("signup")}>
                            <Text style={styles.link}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <Footer activeRoute='profile' />
        </>
    )
}

export default Login