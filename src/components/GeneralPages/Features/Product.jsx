import { product_1 } from "../../../Assets/Assets";
import { IoStarSharp } from "react-icons/io5";
import RelatedProducts from "./RelatedProducts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { base_url } from "../../../constant";
import { apiRequest } from "../../../utils/apiRequest";
import ProductCardSkeleton from "../../Sample/ProductCardSkeleton";

const Product = () => {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleData = async () => {
    let res = await apiRequest("GET", `/users/category/${category}/${id}` )
    // let res = await axios.get(
    //   `${base_url}/users/category/${category}/${id}`
    // );
    setProduct(res.data);
  };

  const handleCart = async (productId, price, quantity = 1) => {
    try {
      const data = {
        items: [
          {
            product: productId,
            quantity: quantity,
            price: price,
          },
        ],
      };
      const res =await apiRequest("POST", `/cart/add-cart`, data, navigate)
      // const res = await axios.post(`${base_url}/cart/add-cart`, data, {
      //   withCredentials: true,
      // });
      toast.success(res.message);
      navigate("/cart");
    } catch (error) {
      // if (!error.response.data.success) {
      //   toast.error("Please Login First");
      //   navigate("/login");
      // }
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    handleData();
  }, [id, category]);

  return (
 <>
  {product == null ? (
   <ProductCardSkeleton/>
  ) : (
    <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:px-28 py-8 gap-6">
      {/* Product Image */}
      <div className="w-full lg:w-1/3 border flex justify-center items-center p-4">
        <img
          src={product.front}
          alt=""
          className="h-80 w-80 object-contain sm:w-72 sm:h-72"
        />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <span className="px-4 py-1 bg-light_green text-green rounded w-max">
          Sale!
        </span>

        <h1 className="text-navy text-3xl md:text-4xl font-semibold">
          {product.productName}
        </h1>

        <div className="my-2">
          {[...Array(5)].map((_, idx) => (
            <IoStarSharp
              key={idx}
              className="inline text-yellow-500 text-base"
            />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-base line-through text-gray-400 font-light">
            MRP: ${product.productPrice}
          </h1>
          <h1 className="text-xl">
            MRP: $<span className="underline">{product.offerPrice}</span>
          </h1>
          <span className="text-gray-400 text-sm font-light">
            (inclusive of all taxes)
          </span>
        </div>

        <p className="text-gray-500 font-normal text-sm md:text-base">
          {product.description} Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ratione laboriosam iure consequatur reiciendis
          earum necessitatibus, dolorem deserunt tempora enim animi culpa
          consequuntur quidem molestiae esse repellendus expedita sunt ipsa
          officiis.
        </p>

        <span className="text-yellow-500 font-light">
          {product.stock} in stock
        </span>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
          <button
            className="text-green bg-light_green py-3 w-full sm:w-1/2 rounded-sm text-base"
            onClick={() =>
              handleCart(product._id, product.offerPrice, product.quantity)
            }
          >
            Add to cart
          </button>
          <button
            className="text-white bg-green py-3 w-full sm:w-1/2 rounded-sm text-base"
            onClick={() =>
              handleCart(product._id, product.offerPrice, product.quantity)
            }
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  )}

  <RelatedProducts value={category} />
</>

  );
};

export default Product;
