import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import PageHeading from '../components/PageHeading';
import { useDispatch } from "react-redux";
import { login } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

    const submitHandler = () => {
        dispatch(login(email, password));
    };

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

                {/* Heading */}
                <PageHeading text={"Login"} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ ...styles.container, minHeight: 550 }}>
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