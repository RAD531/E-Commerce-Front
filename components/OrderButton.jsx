import React, { useEffect, useState } from 'react';
import { useStripe } from "@stripe/stripe-react-native";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { usePaymentOrderMutation, usePlaceOrderMutation } from '../redux/api/apiSlices/orderApiSlice';
import { colors } from '../styles/styles';

const OrderButton = ({ paymentMethod, user, items, navigate }) => {

    const [paymentOrder, { isPaymentOrderLoading }] = usePaymentOrderMutation();
    const [placeOrder, { isPlaceOrderLoading }] = usePlaceOrderMutation();

    const stripe = useStripe();
    const [loading, setLoading] = useState(false);

    const handleClientSecret = async () => {
        try {
            setLoading(true);
            const clientSecret = await paymentOrder({ totalAmount: items.totalAmount }).unwrap();
            handlePayment(clientSecret.client_secret);
        }
        catch {
            setLoading(false);
        }
    }

    const handlePayment = async (clientSecret) => {
        try {
            const init = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: "E-Commerce",
            });

            if (init.error)
                return Toast.show({ type: "error", text1: init.error.message });

            const presentSheet = await stripe.presentPaymentSheet();
            if (presentSheet.error) {
                return Toast.show({ type: "error", text1: presentSheet.error.message });
            }

            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
            if (paymentIntent.status === "Succeeded") {

                const shippingInfo = {
                    address: user.address,
                    city: user.city,
                    country: user.country,
                    pinCode: user.pinCode,
                };

                const orderItems = items.cartItems;
                const itemsPrice = items.itemsPrice;
                const shippingCharges = items.shippingCharges;
                const taxPrice = items.tax;
                const totalAmount = items.totalAmount;
                const paymentInfo = { id: paymentIntent.id, status: paymentIntent.status };

                try {
                    await placeOrder({ shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount }).unwrap();
                    if (navigate) navigate.navigate("home");
                }
                catch {
                    setLoading(false);
                }

                setLoading(false);
            } else {
                setLoading(false);
                return Toast.show({ type: "error", text1: "payment error" });
            }
        } catch (error) {
            setLoading(false);
            return Toast.show({
                type: "error",
                text1: "Some Error Occured",
                text2: error,
            });
        }
    };

    return (
        <>
            <TouchableOpacity onPress={paymentMethod === "COD" ? null : () => handleClientSecret()}>
                <Button loading={loading || isPlaceOrderLoading || isPaymentOrderLoading} disabled={loading || isPlaceOrderLoading || isPaymentOrderLoading} style={styles.btn} textColor={colors.color2} icon={paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"}>
                    {
                        paymentMethod === "COD" ? "Place Order" : "Pay"
                    }
                </Button>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.color3,
        borderRadius: 100,
        margin: 10,
        padding: 5
    }
});

export default OrderButton