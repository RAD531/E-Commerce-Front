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
import { useDispatch } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useGetAllProductsQuery } from '../redux/api/apiSlices/productApiSlice';
import Loader from '../components/Loader';
import { useDebouncedValue } from '../utils/hooks';
import { useGetAllCategoriesQuery } from '../redux/api/apiSlices/categoryApiSlice';

const Home = () => {

    const [category, setCategory] = useState("");
    const [activeSearch, setActiveSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigation();
    const dispatch = useDispatch();
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

    const { data: products, isLoading: isProductsLoading } = useGetAllProductsQuery({ keyword: debouncedSearchQuery, category: category });
    const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();

    const categoryButtonHandler = (id) => {
        setCategory(id);
    };

    const addToCardHandler = (id, name, price, image, stock) => {
        if (stock === 0) return Toast.show({
            type: "error",
            text1: "Out of Stock",
        })
        dispatch({
            type: "addToCart",
            payload: {
                product: id, name, price, image, stock, quantity: 1
            },
        });

        Toast.show({
            type: "success",
            text1: "Added To Cart",
        })
    };

    return (
        <>
            {activeSearch && (
                <SearchModal searchQuery={searchQuery} setSearchQuery={setSearchQuery} setActiveSearch={setActiveSearch} products={products.products} loading={isProductsLoading} />
            )}

            <View style={defaultStyle}>
                {/* Header */}
                <Header />

                {/* Heading Row */}
                <View style={{ paddingTop: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    {/* Heading */}
                    <Heading text1='Our' text2='Products' />

                    {/* Search Bar */}
                    <View>
                        <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
                            <Avatar.Icon icon={"magnify"} size={50} color={'gray'} style={{ backgroundColor: colors.color2, elevation: 12 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View style={{ flexDirection: "row", height: 80 }}>
                    {isCategoriesLoading ? <Loader size={"small"} /> : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
                            {
                                categories.categories.map((item, index) => (
                                    <Button key={item._id} style={{ backgroundColor: category === item._id ? colors.color1 : colors.color5, borderRadius: 100, margin: 5 }} onPress={(() => categoryButtonHandler(item._id))}>
                                        <Text style={{ fontSize: 12, color: category === item._id ? colors.color2 : "gray" }}>{item.category}</Text>
                                    </Button>
                                ))
                            }
                        </ScrollView>
                    )}
                </View>

                {/* Products */}
                <View style={{ flex: 1 }}>
                    {isProductsLoading ? <Loader /> : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {products && products.products.map((item, index) => (
                                <ProductCard stock={item.stock} name={item.name} price={item.price} image={item.images[0]?.url} addToCardHandler={addToCardHandler} id={item._id} key={item._id} i={index} navigate={navigate} />
                            ))}
                        </ScrollView>
                    )}
                </View>

            </View >

            <Footer activeRoute={"home"} />
        </>
    )
}

export default Home