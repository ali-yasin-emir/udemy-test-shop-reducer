import { DUMMY_PRODUCTS } from "@/dummy-products"
import ProductCard from "./ProductCard"



const Shop = () => {


  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap py-24 w-[1140px] gap-4">
            {
                DUMMY_PRODUCTS.map((product) => {
                    return (
                        <ProductCard {...product} key={product.id}/>
                    )
                })
            }
        </div>
    </div>
  ) 
}

export default Shop