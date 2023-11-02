import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import PageHeading from '../components/PageHeading';

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const loading = false;

    const submitHandler = () => {
        alert("Yeah");
        navigation.navigate("verify");
    };

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

                {/* Heading */}
                <PageHeading text={"Forgot Password"} />

                <View style={styles.container}>
                    <TextInput {...inputOptions} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />

                    <Button loading={loading} textColor={colors.color2} disabled={email === ""} style={styles.btn} onPress={submitHandler}>
                        <Text>Send OPT</Text>
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
            </View>

            <Footer activeRoute='profile' />
        </>
    )
}

export default ForgetPassword