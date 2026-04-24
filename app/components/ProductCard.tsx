import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useCart } from "../hooks/useCart";
import { Product } from "../types/Product";

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    Alert.alert(
      "Added to Cart",
      `${quantity} × ${product.productName} has been added.`,
    );
    setQuantity(1);
  };

  return (
    <View className="p-4 m-3 bg-white rounded-xl shadow-sm">
      <Text className="text-brand font-bold text-lg mb-1">
        {product.productName}
      </Text>

      <Text className="text-gray-500 text-sm mb-2">{product.description}</Text>

      <Text className="text-magenta font-semibold text-base mb-3">
        ₱{product.price}
      </Text>

      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-row items-center bg-gray-50 rounded-md overflow-hidden border border-gray-200 w-32 justify-between">
          <Pressable
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 active:opacity-70"
          >
            <Text className="text-base">−</Text>
          </Pressable>

          <View className="px-4 py-1">
            <Text className="text-sm font-medium">{quantity}</Text>
          </View>

          <Pressable
            onPress={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 active:opacity-70"
          >
            <Text className="text-base">+</Text>
          </Pressable>
        </View>

        <Pressable
          className="bg-brand px-5 py-2 rounded-xl shadow-sm active:opacity-80"
          onPress={handleAdd}
        >
          <Text className="text-white font-semibold">Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductCard;
