import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from "../components/Header";
import { Avatar, Button } from 'react-native-paper';
import SearchModal from '../components/SearchModal';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

const categories = [{ category: "Nice", _id: "kdfdfndk" }, { category: "Nice2", _id: "rgdgdgd" }, { category: "Nice3", _id: "daFSGFJ" }, { category: "Nice4", _id: "qeqeqeqe" }, { category: "Nice5", _id: "wqeqeqeqe" }, { category: "Nice6", _id: "fdhdhdhd" }];
export const products = [
    {
        price: 23123,
        stock: 23,
        name: "Sample",
        _id: "hdjvhdsjkfjdksfjksdf",
        category: "IDK",
        images: [
            {
                url: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
        ],
    },

    {
        price: 23123,
        stock: 23,
        name: "Macbook",
        _id: "gsgggsgs",
        category: "Laptop",
        images: [
            {
                url: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
        ],
    },
];

const Home = () => {

    const [category, setCategory] = useState("");
    const [activeSearch, setActiveSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigation();

    const categoryButtonHandler = (id) => {
        setCategory(id);
    };

    const addToCardHandler = (id) => {
        console.log("Add to Cart", id);
    };

    return (
        <>
            {activeSearch && (
                <SearchModal searchQuery={searchQuery} setSearchQuery={setSearchQuery} setActiveSearch={setActiveSearch} products={products} />
            )}

            <View style={defaultStyle}>
                {/* Header */}
                <Header />

                {/* Heading Row */}
                <View style={{ paddingTop: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    {/* Heading */}
                    <Heading text1='Our' text2='Products'/>

                    {/* Search Bar */}
                    <View>
                        <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
                            <Avatar.Icon icon={"magnify"} size={50} color={'gray'} style={{ backgroundColor: colors.color2, elevation: 12 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View style={{ flexDirection: "row", height: 80 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
                        {
                            categories.map((item, index) => (
                                <Button key={item._id} style={{ backgroundColor: category === item._id ? colors.color1 : colors.color5, borderRadius: 100, margin: 5 }} onPress={(() => categoryButtonHandler(item._id))}>
                                    <Text style={{ fontSize: 12, color: category === item._id ? colors.color2 : "gray" }}>{item.category}</Text>
                                </Button>
                            ))
                        }
                    </ScrollView>
                </View>

                {/* Products */}

                <View style={{ flex: 1 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {products.map((item, index) => (
                            <ProductCard stock={item.stock} name={item.name} price={item.price} image={item.images[0]?.url} addToCardHandler={addToCardHandler} id={item._id} key={item._id} i={index} navigate={navigate} />
                        ))}
                    </ScrollView>
                </View>

                <Footer activeRoute={"home"}/>

            </View>
        </>
    )
}

export default Home