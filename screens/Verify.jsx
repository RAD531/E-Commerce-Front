import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import PageHeading from '../components/PageHeading';

const Verify = ({ navigation }) => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const loading = false;

    const submitHandler = () => {
        alert("Yeah");
        navigation.navigate("login");
    };

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

                {/* Heading */}
                <PageHeading text={"Reset Password"} />

                <View style={styles.container}>
                    <TextInput {...inputOptions} placeholder='OTP' value={otp} onChangeText={setOtp} keyboardType='number-pad' />
                    <TextInput {...inputOptions} placeholder='New Password' value={password} onChangeText={setPassword} secureTextEntry={true} />

                    <Button loading={loading} textColor={colors.color2} disabled={otp === "" || password === ""} style={styles.btn} onPress={submitHandler}>
                        <Text>Reset</Text>
                    </Button>

                    <Text style={styles.or}>
                        OR
                    </Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("forgetpassword")}>
                        <Text style={styles.link}>
                            Resend OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footer activeRoute='profile' />
        </>
    )
}

export default Verify