import React from "react";
import { Text, View, Pressable, Alert } from "react-native";
import { Product } from "../types/Product";
import { useCart } from "../hooks/useCart";

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    Alert.alert("Added to Cart", `${product.productName} has been added.`);
  };

  return (
    <View className="p-4 m-2 border border-mid-gray rounded-lg">
      <Text className="text-brand font-bold">{product.productName}</Text>
      <Text className="text-mid-gray">{product.description}</Text>
      <Text className="text-magenta font-semibold">${product.price}</Text>
      <Pressable
        className="bg-brand p-2 mt-2 rounded"
        onPress={handleAdd}
      >
        <Text className="text-white text-center">Add to Cart</Text>
      </Pressable>
    </View>
  );
};

export default ProductCard;
