import { View, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../../styles/styles'
import Header from "../../components/Header";
import PageHeading from '../../components/PageHeading';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import ProductListItem from '../../components/ProductListItem';
import Chart from '../../components/Chart';
import { useGetAdminProductsQuery } from '../../redux/api/apiSlices/productApiSlice';

const AdminPanel = ({ navigation }) => {
  const { data: productsData, isLoading: isProductsLoading } = useGetAdminProductsQuery();
  const products = productsData?.products;
  const outOfStock = productsData?.outOfStock;
  const inStock = productsData?.inStock;

  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;
      default:
        navigation.navigate("adminorders");
        break;
    }
  };

  const deleteProductHandler = (id) => {
    console.log(`Deleting Product with ID: ${id}`)
  };

  return (
    <View style={defaultStyle}>
      {/* Header */}
      <Header back={true} />

      {/* Page Heading */}
      <PageHeading text={"Admin Panel"} paddingTopStyle={70} />

      {isProductsLoading ? <Loader /> : (
        <>
          <View style={{ backgroundColor: colors.color3, borderRadius: 20, alignItems: "center" }}>
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          <View>
            <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between" }}>
              <ButtonBox icon={"plus"} text={"Product"} handler={navigationHandler} />
              <ButtonBox icon={"format-list-bulleted-square"} text={"All Orders"} handler={navigationHandler} reverse={true} />
              <ButtonBox icon={"plus"} text={"Category"} handler={navigationHandler} />
            </View>
          </View>

          <ProductListHeading />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {
                products.map((item, index) => (
                  <ProductListItem key={item._id} i={index} id={item._id} price={item.price} stock={item.stock} name={item.name} category={item.category?.category} imgSrc={item.images[0].url} navigate={navigation} deleteHandler={deleteProductHandler} />
                ))
              }
            </View>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default AdminPanel