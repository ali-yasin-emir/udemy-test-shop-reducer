import { forwardRef, useImperativeHandle, useRef } from "react";

import { CartContext } from "@/store/shopping-cart-context";
import { useContext } from "react";

const CartModal = forwardRef(function CartModal({}, ref) {
  const { items, handleQuantity, openCart } = useContext(CartContext);

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const formattedPrice = totalPrice.toFixed(2);

  return (
    <dialog
      id="modal"
      ref={dialog}
      className="rounded-lg p-4 absolute bg-amber-400 w-[540px] h-fit py-9 backdrop:bg-black/50"
    >
      <h1 className="text-2xl ps-3 py-4 gap">Your Cart</h1>
      {items.length <= 0 ? (
        <div className="ps-4">You dont have any cart item</div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-4">
                <div className="bg-stone-200 p-2 px-4 justify-between rounded-md flex gap-4 items-center">
                  <div className="flex gap-2">
                    <span>{item.name}</span>
                    <span>({item.price}$)</span>
                  </div>
                  <div className="flex gap-2 py-2">
                    <span
                      onClick={() => handleQuantity(item.id, -1)}
                      className="cursor-pointer"
                    >
                      -
                    </span>
                    <span>{item.quantity}</span>
                    <span
                      onClick={() => handleQuantity(item.id, +1)}
                      className="cursor-pointer"
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex self-end pr-4 pt-1 gap-2 items-center">
          <span>Cart Total:</span>
          <span>{formattedPrice}$</span>
        </div>
        <form
          method="dialog"
          className="mt-4 flex place-content-end gap-4 pe-4"
        >
          <button className="">Close</button>
          <button className="bg-orange-600 p-1 ">Checkout</button>
        </form>
      </div>
    </dialog>
  );
});

export default CartModal;
