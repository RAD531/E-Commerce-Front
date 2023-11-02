import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import Header from "../components/Header";
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import PageHeading from '../components/PageHeading';

export const orders = [
    {
        _id: "fewfwfwf",
        shippingInfo: {
            address: "73 easter",
            city: "New York",
            country: "India",
            pinCode: 21313
        },
        createdAt: "12-2-2022T2343",
        orderStatus: "Processing",
        paymentMethod: "COD",
        totalAmount: 20000,
    },
    {
        _id: "gegegege",
        shippingInfo: {
            address: "73 easter",
            city: "New York",
            country: "India",
            pinCode: 21313
        },
        createdAt: "12-2-2022T2343",
        orderStatus: "Processing",
        paymentMethod: "ONLINE",
        totalAmount: 32324,
    },
    {
        _id: "ffsfsfsf",
        shippingInfo: {
            address: "73 easter",
            city: "New York",
            country: "India",
            pinCode: 21313
        },
        createdAt: "12-2-2022T2343",
        orderStatus: "Processing",
        paymentMethod: "ONLINE",
        totalAmount: 32324,
    },
    {
        _id: "grhjykuk",
        shippingInfo: {
            address: "73 easter",
            city: "New York",
            country: "India",
            pinCode: 21313
        },
        createdAt: "12-2-2022T2343",
        orderStatus: "Processing",
        paymentMethod: "ONLINE",
        totalAmount: 32324,
    }
]


const Orders = () => {

    const loading = false;

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>

            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Orders"} paddingTopStyle={70} />

            {
                loading ? <Loader /> : (
                    <View style={{ padding: 10, flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                orders.length > 0 ? orders.map((item, index) => (
                                    <OrderItem key={item._id} id={item._id} i={index} price={item.totalAmount} status={item.orderStatus} paymentMethod={item.paymentMethod} orderedOn={item.createdAt.split("T")[0]} address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`} />
                                )) : <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
                            }
                        </ScrollView>
                    </View>
                )
            }
        </View >
    )
}

export default Orders