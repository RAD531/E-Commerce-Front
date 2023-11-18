import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle } from '../../styles/styles'
import Header from '../../components/Header'
import PageHeading from '../../components/PageHeading'
import ImageCard from '../../components/ImageCard'
import { Avatar, Button } from 'react-native-paper'
import mime from 'mime';
import { useAddProductImageMutation, useDeleteProductImageMutation, useGetProductDetailsQuery } from '../../redux/api/apiSlices/productApiSlice'
import Loader from '../../components/Loader'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const ProductImages = ({ navigation, route }) => {

    const [addImage, { isLoading: isAddImageLoading }] = useAddProductImageMutation();
    const [deleteImage, { isLoading: isDeleteImageLoading }] = useDeleteProductImageMutation();

    const [images, setImages] = useState(route.params.images);
    const [productId] = useState(route.params.id);
    const [image, setImage] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [productDetailsID] = useState(route.params.productDetailsID);

    const { data, isLoading: isProductLoading } = useGetProductDetailsQuery(productDetailsID);
    const productImages = data?.product.images;

    const deleteHandler = async (imageId) => {
        if (images.length < 2) return Toast.show({
            type: "error",
            text1: 'The product must have at least one image',
        });
        
        try {
            await deleteImage({productId, imageId}).unwrap();
        }
        catch {
        }
    };

    const submitHandler = async () => {
        const myForm = new FormData();
        myForm.append("file", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop(),
        });

        try {
            await addImage({ productId, formData: myForm }).unwrap();
        }
        catch {
        }
    };

    useEffect(() => {
        if (route.params?.image) {
            setImage(route.params.image);
            setImageChanged(true);
        }
    }, [route.params]);

    useEffect(() => {
        setImages(productImages);
    }, [productImages]);

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
            <Header back={true} />

            {/* Heading */}
            <PageHeading text={"Manage Product Images"} paddingTopStyle={70} />

            {isProductLoading ? <Loader /> : (
                <>
                    <ScrollView style={{ marginBottom: 20 }}>
                        <View style={{ backgroundColor: colors.color2, padding: 40, minHeight: 400 }}>
                            {
                                images.map(i => (
                                    <ImageCard key={i._id} src={i.url} id={i._id} deleteHandler={deleteHandler} />
                                ))
                            }
                        </View>
                    </ScrollView>

                    <View style={{ padding: 20, borderRadius: 10, backgroundColor: colors.color3 }}>
                        <Image style={{ backgroundColor: colors.color2, width: 100, height: 100, alignSelf: "center", resizeMode: "contain" }} source={{ uri: image }} />

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity TouchableOpacity={0.8} onPress={() => navigation.navigate("camera", { updateProduct: true })}>
                                <Avatar.Icon icon={"camera"} size={30} color={colors.color3} style={{ backgroundColor: colors.color2, margin: 10 }} />
                            </TouchableOpacity>
                        </View>

                        <Button style={{ backgroundColor: colors.color1, padding: 6 }} textColor={colors.color2} loading={isAddImageLoading} onPress={submitHandler} disabled={!imageChanged}>
                            Add
                        </Button>
                    </View>
                </>
            )}
        </View>
    )
}

export default ProductImages