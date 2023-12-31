import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as formStyles } from '../../styles/styles';
import { Avatar, Button, TextInput } from 'react-native-paper';
import Header from "../../components/Header";
import PageHeading from '../../components/PageHeading';
import Loader from '../../components/Loader';
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery } from '../../redux/api/apiSlices/categoryApiSlice';

const Categories = ({ navigation }) => {
    const [category, setCategory] = useState("");

    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
    const categories = categoriesData?.categories;

    const [deleteCategory, {isLoading: isDeleteCategoryLoading}] = useDeleteCategoryMutation();
    const [addCategory, {isLoading: isAddCategoryLoading}] = useAddCategoryMutation();

    const deleteHandler = async (id) => {
        try {
            await deleteCategory(id).wrap();
        }
        catch {
        }
    };

    const submitHandler = async () => {
        try {
            await addCategory(category).wrap();
        }
        catch {
        }
    };

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>

            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Cateogories"} paddingTopStyle={70} />

            {
                isCategoriesLoading ? <Loader /> : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
                            <View style={{ backgroundColor: colors.color2, padding: 20, minHeight: 400 }}>
                                {
                                    categories.map(i => (
                                        <CategoryCard name={i.category} id={i._id} key={i._id} deleteHandler={deleteHandler} />
                                    ))
                                }
                            </View>
                        </ScrollView>

                        <View style={styles.container}>
                            <TextInput {...inputOptions} placeholder='Add Category' value={category} onChangeText={setCategory} />

                            <Button loading={isAddCategoryLoading} textColor={colors.color2} disabled={!category} style={{ backgroundColor: colors.color1, margin: 20, padding: 6 }} onPress={submitHandler}>
                                <Text>Add</Text>
                            </Button>
                        </View>
                    </>
                )
            }
        </View>
    )
}

const CategoryCard = ({ name, id, deleteHandler }) => (
    <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
            {name}
        </Text>
        <TouchableOpacity onPress={() => deleteHandler(id)}>
            <Avatar.Icon icon={"delete"} size={30} style={{ backgroundColor: colors.color1 }} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: colors.color3
    },
    cardContainer: {
        backgroundColor: colors.color2,
        elevation: 5,
        margin: 10,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10
    },
    cardText: {
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 1
    },

});

export default Categories