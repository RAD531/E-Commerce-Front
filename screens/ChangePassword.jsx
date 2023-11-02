import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Header from "../components/Header";
import PageHeading from '../components/PageHeading';

const ChangePassword = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const loading = false;

    const submitHandler = () => {
        alert("Yeah");
    };

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Change Password"} paddingTopStyle={70}/>

            <View style={styles.container}>
                <TextInput {...inputOptions} placeholder='Old Password' value={oldPassword} onChangeText={setOldPassword} secureTextEntry={true} />
                <TextInput {...inputOptions} placeholder='New Password' value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} />

                <Button loading={loading} textColor={colors.color2} disabled={oldPassword === "" || newPassword === ""} style={styles.btn} onPress={submitHandler}>
                    <Text>Change Password</Text>
                </Button>
            </View>
        </View>
    )
}

export default ChangePassword