import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useCart } from "../hooks/useCart";

type Message = {
  type: "error" | "success" | "";
  text: string;
};

const validateVoucher = (code: string): string | null => {
  const voucherKey = code.trim().toLowerCase();
  if (!voucherKey) return "Please enter a voucher code.";
  if (!/^[a-z0-9]+$/.test(voucherKey))
    return "Voucher code must be alphanumeric with no spaces.";
  if (voucherKey.length < 5 || voucherKey.length > 20)
    return "Voucher code must be between 5 and 20 characters.";
  return null;
};

const VoucherInput: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [message, setMessage] = useState<Message>({ type: "", text: "" });
  const { applyVoucher, cart } = useCart();

  const handleApply = () => {
    if (!cart || cart.length === 0) {
      setMessage({ type: "error", text: "Your cart is empty." });
      return;
    }
    const error = validateVoucher(code);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const applied = applyVoucher(code.trim().toLowerCase());
    if (!applied) {
      setMessage({ type: "error", text: "Voucher not recognized or invalid." });
    } else {
      setMessage({ type: "success", text: "Voucher applied successfully." });
      setCode("");
    }
  };

  const handleChange = (text: string) => {
    setCode(text);
    if (message.text) setMessage({ type: "", text: "" });
  };

  return (
    <View className="px-5 pb-5 bg-white rounded-xl shadow-sm">
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-5"
        placeholder="Enter voucher code"
        value={code}
        onChangeText={handleChange}
      />
      {message.type === "error" && (
        <Text className="text-red-500 mb-3">{message.text}</Text>
      )}
      {message.type === "success" && (
        <Text className="text-green-600 mb-3">{message.text}</Text>
      )}
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
