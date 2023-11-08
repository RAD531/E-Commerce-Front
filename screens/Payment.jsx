import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from "../components/Header";
import Heading from '../components/Heading';
import { RadioButton, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { paymentOrder, placeOrder } from '../redux/actions/orderActions';
import { useMessageAndErrorGeneral } from "../utils/hooks";
import { useStripe } from "@stripe/stripe-react-native";

const Payment = ({ navigation, route }) => {

    const Payment = [paymentMethod, setPaymentMethod] = useState("COD");

    const dispatch = useDispatch();
    const stripe = useStripe();
    const loading = useMessageAndErrorGeneral(dispatch, "order", navigation, "profile", () => ({ type: "clearCart" }));

    const { isAuthenticated, user } = useSelector((state) => state.user);
    // const { paymentClientSecret } = useSelector((state) => state.order);
    const { cartItems } = useSelector((state) => state.cart);

    const redirectToLogin = () => {
        navigation.navigate("login");
    };

    const codHandler = (paymentInfo) => {
        const shippingInfo = {
            address: user.address,
            city: user.city,
            country: user.country,
            pinCode: user.pinCode,
        }

        const itemsPrice = route.params.itemsPrice;
        const shippingCharges = route.params.shippingCharges;
        const taxPrice = route.params.tax;
        const totalAmount = route.params.totalAmount;

        dispatch(placeOrder(cartItems, shippingInfo, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount, paymentInfo));
    };

    const onlineHandler = async () => {
        const totalAmount = route.params.totalAmount;
        await dispatch(paymentOrder(totalAmount));
    };

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

            <TouchableOpacity onPress={!isAuthenticated ? redirectToLogin : paymentMethod === "COD" ? () => codHandler() : onlineHandler}>
                <Button loading={loading} disabled={loading} style={styles.btn} textColor={colors.color2} icon={paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"}>
                    {
                        paymentMethod === "COD" ? "Place Order" : "Pay"
                    }
                </Button>
            </TouchableOpacity>
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
    btn: {
        backgroundColor: colors.color3,
        borderRadius: 100,
        margin: 10,
        padding: 5
    }
});

export default Payment