import React from "react";
import { SafeAreaView, View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import ProductList from "./components/ProductList";
import { useCart } from "./hooks/useCart";

export default function Index() {
  const router = useRouter();
  const { cart } = useCart();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <ProductList />

        <Pressable
          className="bg-brand p-4 m-5 rounded-xl shadow-sm flex-row justify-center items-center active:opacity-80"
          onPress={() => router.push("/cart")}
        >
          <Text className="text-white text-center font-semibold text-base mr-2">
            Go to Cart
          </Text>
          {cart.length > 0 && (
            <View className="bg-white px-2 min-w-[26px] rounded-full items-center justify-center">
              <Text className="text-brand font-bold text-sm">
                {cart.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
