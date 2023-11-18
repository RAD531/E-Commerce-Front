import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import PageHeading from '../../components/PageHeading'
import { colors, defaultStyle, inputOptions, inputStyling } from '../../styles/styles'
import Loader from '../../components/Loader'
import { Avatar, Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'
import { useGetAllCategoriesQuery } from '../../redux/api/apiSlices/categoryApiSlice';
import mime from "mime";
import { useAddProductMutation } from '../../redux/api/apiSlices/productApiSlice'

const NewProduct = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [categoryID, setCategoryID] = useState(undefined);

    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
    const categories = categoriesData?.categories;

    const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();

    const entryCondition = !name || !description || !price || !stock || !image;

    const submitHandler = async () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("description", description);
        myForm.append("price", price);
        myForm.append("stock", stock);
        myForm.append("file", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop(),
        });

        if (categoryID) myForm.append("category", categoryID);

        try {
            await addProduct(myForm).unwrap();
            navigation.navigate("adminpanel");
        }
        catch {
        }
    };

    useEffect(() => {
        if (route.params?.image) {
            setImage(route.params.image);
        }
    }, [route.params]);

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
                <Header back={true} />

                {/* Heading */}
                <PageHeading text={"New Product"} paddingTopStyle={70} />

                {
                    isCategoriesLoading ? <Loader /> : (
                        <ScrollView style={{ padding: 20, elevation: 10, borderRadius: 10, backgroundColor: colors.color3 }}>
                            <View style={{ justifyContent: "center", height: 650 }}>

                                <View style={{ width: 80, height: 80, alignSelf: "center", marginBottom: 20 }}>
                                    <Avatar.Image size={80} style={{ backgroundColor: colors.color1 }} source={{ uri: image ? image : null }} />
                                    <TouchableOpacity onPress={() => navigation.navigate("camera", { newProduct: true })}>
                                        <Avatar.Icon icon={"camera"} size={30} color={colors.color3} style={{ backgroundColor: colors.color2, position: "absolute", bottom: 0, right: -5 }} />
                                    </TouchableOpacity>
                                </View>

                                <TextInput {...inputOptions} placeholder='Name' value={name} onChangeText={setName} />
                                <TextInput {...inputOptions} placeholder='Description' value={description} onChangeText={setDescription} />
                                <TextInput {...inputOptions} placeholder='Price' value={price} onChangeText={setPrice} keyboardType='number-pad' />
                                <TextInput {...inputOptions} placeholder='Stock' value={stock} onChangeText={setStock} keyboardType='number-pad' />

                                <Text onPress={() => setVisible(true)} style={{ ...inputStyling, textAlign: "center", borderRadius: 3, textAlignVertical: "center" }}>
                                    {category}
                                </Text>

                                <Button textColor={colors.color2} style={{ backgroundColor: colors.color1, margin: 20, padding: 6 }} onPress={submitHandler} loading={isAddProductLoading} disabled={entryCondition || isAddProductLoading}>
                                    Create
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

export default NewProduct