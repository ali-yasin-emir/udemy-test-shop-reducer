"use client";

import Header from "./components/Header";
import Shop from "./components/Shop";
import CartContextProvider from "@/store/shopping-cart-context";

const Home = () => {
  return (
    <CartContextProvider>
      <Header />
      <Shop />
    </CartContextProvider>
  );
};

export default Home;
