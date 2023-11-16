import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Header from "../components/Header";
import PageHeading from '../components/PageHeading';
import { useGetUserQuery } from '../redux/api/apiSlices/userApiSlice';
import { useUpdateProfileMutation } from '../redux/api/apiSlices/profileApiSlice';

const UpdateProfile = ({ navigation }) => {

    const { data, isLoading: isGetProfileLoading } = useGetUserQuery();
    const user = data?.user;

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [pinCode, setPinCode] = useState(user?.pinCode.toString());

    const disableBtn = !name || !email || !address || !city || !country || !pinCode;

    const submitHandler = async () => {
        try {
            await updateProfile(name, email, address, city, country, pinCode).unwrap();
        }
        catch (error) {
        }
    };

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Edit Profile"} paddingTopStyle={70} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, elevation: 10, borderRadius: 10, backgroundColor: colors.color3 }}>

                <View>

                    <TextInput {...inputOptions} placeholder='Name' value={name} onChangeText={setName} />
                    <TextInput {...inputOptions} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />
                    <TextInput {...inputOptions} placeholder='Address' value={address} onChangeText={setAddress} />
                    <TextInput {...inputOptions} placeholder='City' value={city} onChangeText={setCity} />
                    <TextInput {...inputOptions} placeholder='Country' value={country} onChangeText={setCountry} />
                    <TextInput {...inputOptions} placeholder='Pin Code' value={pinCode} onChangeText={setPinCode} />

                    <Button loading={isLoading} textColor={colors.color2} disabled={disableBtn} style={styles.btn} onPress={submitHandler}>
                        <Text>Update</Text>
                    </Button>
                </View>

            </ScrollView>
        </View>
    )
}

export default UpdateProfile