import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import PageHeading from '../components/PageHeading';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loading = false;

    const submitHandler = () => {
        alert("Yeah");
    };

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

                {/* Heading */}
                <PageHeading text={"Login"} />

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
            </View>

            <Footer activeRoute='profile' />
        </>
    )
}

export default Login