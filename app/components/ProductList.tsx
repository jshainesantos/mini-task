import React from "react";
import { FlatList } from "react-native";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

export default ProductList;
