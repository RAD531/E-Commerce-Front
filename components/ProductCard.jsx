import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../styles/styles'
import { Button } from 'react-native-paper'

const ProductCard = ({ stock, name, price, image, id, addToCardHandler, i, navigate }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigate.navigate("productdetails", { id })}>
            <View style={{ elevation: 15, width: 250, alignItems: "center", justifyContent: "space-between", borderRadius: 20, height: 400, backgroundColor: i % 2 === 0 ? colors.color1 : colors.color2 }}>
                <Image source={{ uri: image, }} style={{ width: "100%", height: 200, resizeMode: "contain", position: "absolute", left: 50, top: 105 }} />
                <View style={{ flexDirection: "row", padding: 20, paddingTop: 15, justifyContent: "space-between", width: "100%" }}>
                    <Text numberOfLines={2} style={{ color: i % 2 === 0 ? colors.color2 : colors.color3, fontSize: 25, fontWeight: "300", width: "60%", paddingTop: 20 }}>
                        {name}
                    </Text>
                    <Text numberOfLines={2} style={{ color: i % 2 === 0 ? colors.color2 : colors.color3, fontSize: 20, fontWeight: "700", }}>
                        £{price}
                    </Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3, borderRadius: 0, paddingVertical: 5, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, width: "100%" }}>
                    <Button onPress={() => addToCardHandler(id, name, price, image, stock)} textColor={i % 2 === 0 ? colors.color1 : colors.color2}>
                        <Text>
                            {stock < 1 ? "Out of Stock" : "Add To Cart"}
                        </Text>
                    </Button>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard