import { createContext, useContext, useState } from "react";
import { Product } from "../utils/interfaces";

type CartItems = Record<string, Product[] | undefined>;

const cartContext = createContext<
  [CartItems, React.Dispatch<React.SetStateAction<CartItems>>] | null
>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItems>({});
  return (
    <cartContext.Provider value={[cartItems, setCartItems]}>
      {children}
    </cartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
