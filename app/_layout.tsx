// app/_layout.tsx
import { Stack } from "expo-router";
import "../global.css";
import { CartProvider } from "./context/CartContext";

export default function Layout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#F53E62" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Products",
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Your Cart",
          }}
        />
      </Stack>
    </CartProvider>
  );
}
