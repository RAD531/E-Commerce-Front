import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import PageHeading from '../../components/PageHeading'
import { colors, defaultStyle, inputOptions, inputStyling } from '../../styles/styles'
import Loader from '../../components/Loader'
import { Avatar, Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'

const NewProduct = ({ navigation, route }) => {

    const loading = false;

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Laptop");
    const [categoryID, setCategoryID] = useState("");
    const [categories, setCategories] = useState([
        { _id: "fejlfjew", category: "Laptop" },
        { _id: "gewgweg", category: "Footwear" },
        { _id: "gwaafgr", category: "Clothes" },
    ]);
    const [visible, setVisible] = useState(false);

    const submitHandler = () => {

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
                    loading ? <Loader /> : (
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

                                <Button textColor={colors.color2} style={{ backgroundColor: colors.color1, margin: 20, padding: 6 }} onPress={submitHandler} loading={loading} disabled={loading}>
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