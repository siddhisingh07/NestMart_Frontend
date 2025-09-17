import Heading from "../../Common/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHeart, IoStar, IoStarSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { product_1, product_1_back } from "../../../Assets/Assets";
import axios from "axios";
import { base_url } from "../../../constant";
import toast from "react-hot-toast";
import { HeadingClass } from "../../PropsClass";
import {Card} from '../../Common/Card'
import { CardSkeleton } from "../../Sample/CardSkeleton";
import { apiRequest } from "../../../utils/apiRequest";

const CategorizedProduct = () => {
  const [productList, setProductList] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const param = useParams();
  const navigate = useNavigate()
  let category = param.category;

  const handleData = async () => {
  try {
    let res = await apiRequest("GET", `/users/category/${category}`)
      // let res = await axios.get(`${base_url}/users/category/${category}`);
     setProductList(res.data);
  
  } catch (error) {
    console.error(error)
    toast.error(error.message)
  }
  };

  const handleClick =  (id)=>{
    navigate(`/products/${category}/${id}`)
  }
  useEffect(() => {
    handleData();
  }, [category]);
  return (
    <>
      <div className="px-4 md:px-10 lg:px-28 py-6">
        
         <Heading
        value={new HeadingClass(param.category, "start")}
      />
        <div className="flex gap-4 flex-wrap">
          {productList == null ? (
           <CardSkeleton/>
          ) : (
            productList.map((item, idx) => {
              let off =
              ((item.productPrice - item.offerPrice) / item.productPrice) * 100;
            off = Math.abs(Math.round(off));
            item.off = off
              return (
                <Card value={{item, idx}} key={idx}/>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default CategorizedProduct;
