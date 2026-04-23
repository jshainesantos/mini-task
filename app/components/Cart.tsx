import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, removeFromCart, total, discountedTotal } = useCart();

  return (
    <View className="p-4">
      <Text className="text-brand font-bold mb-2">
        Cart ({cart.length} items)
      </Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-2 border-b border-mid-gray">
            <Text className="text-deep-black">
              {item.productName} x{item.quantity}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-magenta mr-4">
                ₱{item.price * item.quantity}
              </Text>
              <Pressable onPress={() => removeFromCart(item.id)}>
                <Text className="text-danger">Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <Text className="text-mid-gray mt-4">Total: ₱{total.toFixed(2)}</Text>
      {discountedTotal !== total && (
        <Text className="text-brand-dark font-bold">
          Discounted Total: ₱{discountedTotal.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

export default Cart;
