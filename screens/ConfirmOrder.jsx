import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from "../components/Header";
import Heading from '../components/Heading';
import { cartItems } from './Cart';
import ConfirmOrderItem from '../components/ConfirmOrderItem';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const ConfirmOrder = () => {

    const navigate = useNavigation();
    const itemsPrice = 4000;
    const shippingCharges = 200;
    const tax = 0.18 * itemsPrice;
    const totalAmount = itemsPrice + shippingCharges + tax;

    return (
        <View style={{ ...defaultStyle, padding: 0 }}>
            {/* Header */}
            <Header back={true} />

            {/* Heading */}
            <Heading containerStyle={{ paddingTop: 100, marginLeft: 35 }} text1='Confirm' text2='Order' />

            <View style={{ paddingVertical: 20, flex: 1, marginHorizontal: 30 }}>
                <ScrollView>
                    {cartItems.map(i => (
                        <ConfirmOrderItem key={i.product} image={i.image} name={i.name} price={i.price} quantity={i.quantity} />
                    ))}
                </ScrollView>
            </View>

            <PriceTag heading={"Subtotal"} value={itemsPrice} />
            <PriceTag heading={"Shipping"} value={shippingCharges} />
            <PriceTag heading={"Tax"} value={tax} />
            <PriceTag heading={"Total Amount"} value={totalAmount} />

            <TouchableOpacity onPress={() => navigate.navigate("payment", { itemsPrice, shippingCharges, tax, totalAmount })}>
                <Button style={{backgroundColor: colors.color3, borderRadius: 100, padding: 5, margin: 20, marginBottom: 40}} textColor={colors.color2} icon={"chevron-right"}>
                    <Text>
                        Payment
                    </Text>
                </Button>
            </TouchableOpacity>
        </View>
    )
}

const PriceTag = ({ heading, value }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5, marginHorizontal: 50 }}>
        <Text style={{ fontWeight: "800" }}>
            {heading}
        </Text>
        <Text>
            £{value}
        </Text>
    </View>
);

export default ConfirmOrder