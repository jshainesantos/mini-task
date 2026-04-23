import React from "react";
import { SafeAreaView, View } from "react-native";
import Cart from "./components/Cart";
import VoucherInput from "./components/VoucherInput";

export default function CartPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Cart />
        <VoucherInput />
      </View>
    </SafeAreaView>
  );
}
