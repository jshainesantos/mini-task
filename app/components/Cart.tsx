import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, discountedTotal } =
    useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="p-5 bg-white rounded-xl shadow-sm flex-1">
      <Text className="text-brand font-bold text-lg mb-4">
        🛒 Cart ({totalItems} items)
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
              <View className="flex-row items-center py-3 border-b border-gray-100">
                <View className="flex-1 pr-3">
                  <View>
                    <Text className="text-deep-black font-semibold text-base">
                      {item.productName}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      ₱{item.price.toFixed(2)} each
                    </Text>
                  </View>

                  <View className="mt-1">
                    <View className="flex-row items-center bg-gray-50 rounded-md overflow-hidden border border-gray-200 w-32 justify-between">
                      <Pressable
                        className="px-3 py-1"
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Text className="text-base">−</Text>
                      </Pressable>
                      <View className="px-4 py-1">
                        <Text className="text-sm font-medium">
                          {item.quantity}
                        </Text>
                      </View>
                      <Pressable
                        className="px-3 py-1"
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Text className="text-base">+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View className="items-end justify-center">
                  <Text className="text-deep-black font-semibold text-sm">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </Text>

                  <Pressable
                    className="mt-1"
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text className="text-red-500 text-sm">Remove</Text>
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
