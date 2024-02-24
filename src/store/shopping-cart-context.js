import { DUMMY_PRODUCTS } from "@/dummy-products";
import {
  createContext,
  useReducer,
} from "react";

export const CartContext = createContext({
  items: [],
  addToCart: () => {},
  handleQuantity: () => {},
});

const cartReducer = (state, action) => {
  
    if(action.type === "ADD_ITEM"){
    const updatedCart = [...state.items];

    const cartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === action.payload
    );

    const existingCartItem = updatedCart[cartItemIndex];

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };

      updatedCart[cartItemIndex] = updatedCartItem;
    } else {
      const cartItem = DUMMY_PRODUCTS.find((item) => item.id === action.payload);

      updatedCart.push({
        id: action.payload,
        price: cartItem.price,
        name: cartItem.title,
        quantity: 1,
      });
    }
    console.log(updatedCart);

    return {
   // ...state, if we have a multiple state, we could do that
      items: updatedCart, 
    };
    } 
    if(action.type === "UPDATE_QUANTITY"){
      const updatedCart = [...state.items];

      const cartItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      const existingCartItem = updatedCart[cartItemIndex];

      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.payload.amount,
      };


      if (updatedItem.quantity <= 0) {
        updatedCart.splice(cartItemIndex, 1);
      } else {
        updatedCart[cartItemIndex] = updatedItem;
      }
  
      return {
        ...state, // not needed but you can add this
        items: updatedCart,
      };
    }
    return state;
}





// All logical operations like useStates, handleFunctions and ctxValue will be in this function, so we don't need to stick all functionality related with components in app page, or main page.
export const CartContextProvider = ({ children }) => {

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  const handleAddToCart = (id) => {
    cartDispatch({
    type: "ADD_ITEM",
    payload: id
    });
  };

  const handleQuantity = (id, amount) => {
    cartDispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id,
        amount
      }
    })
  };

  const ctxValue = {
    items: cartState.items,
    products: DUMMY_PRODUCTS,
    addToCart: handleAddToCart,
    handleQuantity: handleQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue} className="flex-col">
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
