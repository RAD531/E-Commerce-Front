import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from "../components/Header";
import Heading from '../components/Heading';
import { RadioButton, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { paymentOrder, placeOrder } from '../redux/actions/orderActions';
import { useMessageAndError } from "../utils/hooks";
import OrderButton from '../components/OrderButton';

const Payment = ({ navigation, route }) => {

    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [items] = useState({
        orderItems: cartItems,
        itemsPrice: route.params.itemsPrice,
        shippingCharges: route.params.shippingCharges,
        taxPrice: route.params.tax,
        totalAmount: route.params.totalAmount,
    });

    return (
        <View style={defaultStyle}>
            {/* Header */}
            <Header back={true} />
            <Heading containerStyle={{ paddingTop: 70 }} text1='Payment' text2='Method' />

            <View style={styles.container}>
                <RadioButton.Group value={paymentMethod} onValueChange={setPaymentMethod}>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>Cash On Delivery</Text>
                        <RadioButton color={colors.color1} value={"COD"} />
                    </View>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>ONLINE</Text>
                        <RadioButton color={colors.color1} value={"ONLINE"} />
                    </View>
                </RadioButton.Group>
            </View>

            {
                !isAuthenticated ? null : (
                    <OrderButton paymentMethod={paymentMethod} user={user} items={items} navigate={navigation} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color3,
        padding: 30,
        borderRadius: 10,
        marginVertical: 20,
        flex: 1,
        justifyContent: "center"
    },
    radioStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    radioStyleText: {
        fontWeight: "600",
        fontSize: 18,
        textTransform: "uppercase",
        color: colors.color2
    },
});

export default Payment