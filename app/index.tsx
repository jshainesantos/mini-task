import React from "react";
import { SafeAreaView, View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import ProductList from "./components/ProductList";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ProductList />
        <Pressable
          className="bg-brand p-4 m-4 rounded"
          onPress={() => router.push("/cart")}
        >
          <Text className="text-white text-center font-bold">Go to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
