import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, removeFromCart, total, discountedTotal } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="p-5 bg-white rounded-xl shadow-sm flex-1">
      <Text className="text-brand font-bold text-lg mb-4">
        Cart ({totalItems} items)
      </Text>

      {totalItems === 0 ? (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-gray-500 text-base font-medium">
            Your cart is empty
          </Text>
          <Text className="text-gray-400 text-sm mt-2">
            Add products to see them here.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
                <Text className="text-deep-black font-medium">
                  {item.productName} ×{item.quantity}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-magenta font-semibold mr-4">
                    ₱{item.price * item.quantity}
                  </Text>
                  <Pressable
                    className="px-3 py-1 bg-red-100 rounded-lg"
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text className="text-danger font-medium">Remove</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
          <View className="mt-5">
            <Text className="text-gray-600">Total: ₱{total.toFixed(2)}</Text>
            {discountedTotal !== total && (
              <Text className="text-brand-dark font-bold text-lg mt-1">
                Discounted Total: ₱{discountedTotal.toFixed(2)}
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;
