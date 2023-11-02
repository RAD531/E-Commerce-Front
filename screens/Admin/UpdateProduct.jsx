import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import PageHeading from '../../components/PageHeading'
import { colors, defaultStyle, inputOptions, inputStyling } from '../../styles/styles'
import Loader from '../../components/Loader'
import { Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'

const UpdateProduct = ({ navigation, route }) => {

    const loading = false;
    const loadingOther = false;

    const images = [
        {
            url: "https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            _id: "fejifesjife"
        },
        {
            url: "https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            _id: "thtrjtj"
        },

    ];

    const [id] = useState(route.params.id);
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

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
                <Header back={true} />

                {/* Heading */}
                <PageHeading text={"Update Product"} paddingTopStyle={70} />

                {
                    loading ? <Loader /> : (
                        <ScrollView style={{ padding: 20, elevation: 10, borderRadius: 10, backgroundColor: colors.color3 }}>
                            <View style={{ justifyContent: "center", height: 650 }}>
                                <Button onPress={() => navigation.navigate("productimages", { id, images: images })} textColor={colors.color1}>
                                    Manage Images
                                </Button>
                                <TextInput {...inputOptions} placeholder='Name' value={name} onChangeText={setName} />
                                <TextInput {...inputOptions} placeholder='Description' value={description} onChangeText={setDescription} />
                                <TextInput {...inputOptions} placeholder='Price' value={price} onChangeText={setPrice} keyboardType='number-pad' />
                                <TextInput {...inputOptions} placeholder='Stock' value={stock} onChangeText={setStock} keyboardType='number-pad' />

                                <Text onPress={() => setVisible(true)} style={{ ...inputStyling, textAlign: "center", borderRadius: 3, textAlignVertical: "center" }}>
                                    {category}
                                </Text>

                                <Button textColor={colors.color2} style={{ backgroundColor: colors.color1, margin: 20, padding: 6 }} onPress={submitHandler} loading={loadingOther} disabled={loadingOther}>
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