import Image from "next/image";

import { CartContext } from "@/store/shopping-cart-context";
import { useContext } from "react";

const ProductCard = ({ id, image, title, description, price }) => {

    const {addToCart} = useContext(CartContext)

  return (
    <div key={id} className="flex flex-col bg-orange-300 w-[350px] h-[600px]">
      <div className="">
        <Image
          src={image}
          className="object-cover"
          width={540}
          height={340}
          alt="product img"
        />
        <div className="flex flex-col gap-4 p-4 justify-center">
          <span>{title}</span>
          <span className="flex self-start">{price}$</span>
          <span className="line-clamp-3">{description}</span>
          <button
            onClick={() => addToCart(id)}
            className="w-fit self-end text-white bg-orange-600 px-2 py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
