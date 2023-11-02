import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../../styles/styles'
import Header from '../../components/Header'
import PageHeading from '../../components/PageHeading'
import Loader from '../../components/Loader'
import OrderItem from '../../components/OrderItem'
import { Headline } from 'react-native-paper'
import { orders } from '../Orders'

const AdminOrders = () => {

    const loading = false;
    const processOrderLoading = false;

    const updateHandler = () => {

    };

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Admin Orders"} paddingTopStyle={70} />

            {
                loading ? <Loader /> : (
                    <View style={{ padding: 10, flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                orders.length > 0 ? orders.map((item, index) => (
                                    <OrderItem key={item._id} id={item._id} i={index} price={item.totalAmount} status={item.orderStatus} paymentMethod={item.paymentMethod} orderedOn={item.createdAt.split("T")[0]} address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`} admin={true} updateHandler={updateHandler} loading={processOrderLoading} />
                                )) : <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
                            }
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}

export default AdminOrders