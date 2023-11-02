import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from "../components/Header";
import Heading from '../components/Heading';
import { Button } from 'react-native-paper';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';

export const cartItems = [
    {
        name: "Macbook",
        image: "https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        product: "ihfhgrehgh",
        stock: 3,
        price: 49999,
        quantity: 2
    },
    {
        name: "Shoes",
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        product: "dfgegrewgwg",
        stock: 5,
        price: 233,
        quantity: 5
    },
    {
        name: "Shoes",
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        product: "egasgsgs",
        stock: 5,
        price: 233,
        quantity: 5
    },
    {
        name: "Shoes",
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        product: "jykukuk",
        stock: 5,
        price: 233,
        quantity: 5
    }
];

const Cart = () => {

    const navigate = useNavigation();

    const incrementHandler = () => {

    };

    const decrementHandler = () => {

    };

    return (
        <View style={{ ...defaultStyle, padding: 0 }}>
            {/* Header */}
            <Header back={true} emptyCart={true} />

            {/* Heading */}
            <Heading text1='Shopping' text2='Cart' containerStyle={{ paddingTop: 100, marginLeft: 35 }} />

            <View style={{ paddingVertical: 20, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        cartItems.map((i, index) => (
                            <CartItem navigate={navigate} key={i.product} id={i.product} name={i.name} stock={i.name} amount={i.price} qty={i.quantity} imgSrc={i.image} index={index} incrementHandler={incrementHandler} decrementHandler={decrementHandler} />
                        ))
                    }
                </ScrollView>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 35 }}>
                <Text>5 Items</Text>
                <Text>£5</Text>
            </View>

            <TouchableOpacity onPress={cartItems.length > 0 ? () => navigate.navigate("confirmorder") : null}>
                <Button style={{ backgroundColor: colors.color3, borderRadius: 100, padding: 5, margin: 30 }} icon={"cart"} textColor={colors.color2}>
                    <Text>
                        Checkout
                    </Text>
                </Button>
            </TouchableOpacity>

        </View>
    )
}

export default Cart