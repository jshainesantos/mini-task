import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useCart } from "../hooks/useCart";

const VoucherInput = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { applyVoucher } = useCart();

  const handleApply = () => {
    if (!code.trim()) {
      setError("Please enter a voucher code.");
      return;
    }
    setError("");
    applyVoucher(code);
  };

  return (
    <View className="px-5 pb-5 bg-white rounded-xl shadow-sm">
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-5"
        placeholder="Enter voucher code"
        value={code}
        onChangeText={(text) => {
          setCode(text);
          if (error) setError("");
        }}
      />
      {error ? <Text className="text-red-500 mb-3">{error}</Text> : null}
      <Pressable
        className="bg-brand p-4 rounded-xl shadow-sm active:opacity-80 flex-row justify-center items-center"
        onPress={handleApply}
      >
        <Text className="text-white text-center font-semibold text-base">
          Apply Voucher
        </Text>
      </Pressable>
    </View>
  );
};

export default VoucherInput;
