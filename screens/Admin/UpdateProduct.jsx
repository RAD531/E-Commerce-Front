import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import PageHeading from '../../components/PageHeading'
import { colors, defaultStyle, inputOptions, inputStyling } from '../../styles/styles'
import Loader from '../../components/Loader'
import { Avatar, Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'
import { useGetAllCategoriesQuery } from '../../redux/api/apiSlices/categoryApiSlice'
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/api/apiSlices/productApiSlice'

const UpdateProduct = ({ navigation, route }) => {

    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
    const categories = categoriesData?.categories;

    const { data, isLoading: isProductLoading } = useGetProductDetailsQuery(route.params.id);
    const product = data?.product;

    const [updateProduct, { isLoading: isUpdateProductLoading }] = useUpdateProductMutation();

    const [visible, setVisible] = useState(false);

    const [id] = useState(route.params.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [categoryID, setCategoryID] = useState("");

    const entryCondition = !name || !description || !price || !stock;

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.toString());
            setStock(product.stock.toString());
            setCategory(product?.category?.category ? product.category.category : "Choose Category");
            setCategoryID(product?.category?._id.toString());
        }
    }, [product]);

    const submitHandler = async () => {
        try {
            await updateProduct({ id, name, description, price, stock, category: categoryID }).unwrap();
            navigation.navigate("adminpanel");
        }
        catch {
        }
    };

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
                <Header back={true} />

                {/* Heading */}
                <PageHeading text={"Update Product"} paddingTopStyle={70} />

                {
                    isCategoriesLoading || isProductLoading ? <Loader /> : (
                        <ScrollView style={{ padding: 20, elevation: 10, borderRadius: 10, backgroundColor: colors.color3 }}>
                            <View style={{ justifyContent: "center", height: 650 }}>
                                <Avatar.Image source={{ uri: product.images[0].url }} size={100} style={{ backgroundColor: colors.color1, alignSelf: 'center' }} />
                                <Button onPress={() => navigation.navigate("productimages", { id, images: product.images, productDetailsID: id })} textColor={colors.color1}>
                                    Manage Images
                                </Button>
                                <TextInput {...inputOptions} placeholder='Name' value={name} onChangeText={setName} />
                                <TextInput {...inputOptions} placeholder='Description' value={description} onChangeText={setDescription} />
                                <TextInput {...inputOptions} placeholder='Price' value={price} onChangeText={setPrice} keyboardType='number-pad' />
                                <TextInput {...inputOptions} placeholder='Stock' value={stock} onChangeText={setStock} keyboardType='number-pad' />

                                <Text onPress={() => setVisible(true)} style={{ ...inputStyling, textAlign: "center", borderRadius: 3, textAlignVertical: "center" }}>
                                    {category}
                                </Text>

                                <Button textColor={colors.color2} style={{ backgroundColor: colors.color1, margin: 20, padding: 6 }} onPress={submitHandler} loading={isUpdateProductLoading} disabled={isUpdateProductLoading || entryCondition}>
                                    Update
                                </Button>
                            </View>
                        </ScrollView>
                    )
                }

            </View>

            <SelectComponent setCategory={setCategory} setCategoryID={setCategoryID} categories={categories} visible={visible} setVisible={setVisible} />
        </>
    )
}

export default UpdateProduct