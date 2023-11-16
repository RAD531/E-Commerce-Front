import { View, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from "../components/Header";
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import PageHeading from '../components/PageHeading';
import { useMessageAndError } from "../utils/hooks";
import { useGetOrdersQuery } from '../redux/api/apiSlices/orderApiSlice';

const Orders = () => {

    const { data, isLoading: isOrdersLoading } = useGetOrdersQuery(false);
    const orders = data?.orders;

    const loading = useMessageAndError(dispatch, null, null, false, "order", null);

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>

            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Orders"} paddingTopStyle={70} />

            {
                isOrdersLoading ? <Loader /> : (
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