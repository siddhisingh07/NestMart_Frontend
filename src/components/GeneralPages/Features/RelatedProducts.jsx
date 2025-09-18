import { useEffect, useState } from "react";
import Heading from "../../Common/Heading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../../Common/Card";
import { HeadingClass } from "../../PropsClass";
import { base_url } from "../../../constant";
import { CardSkeleton } from "../../Sample/CardSkeleton";
import { apiRequest } from "../../../utils/apiRequest";

const RelatedProducts = (value) => {
  const [productData, setProductData] = useState(null);
  const [product, setProduct] = useState(null);
  const { id, category } = useParams();

  //Product details
  const handleData = async () => {
    let res = await apiRequest("GET", `/users/category/${value.value}`)
    setProductData(res.data);
  };

  useEffect(() => {
    handleData();
  }, [value]);

  //related product data
  const handleProductData = async () => {
    let res = await apiRequest("GET", `/users/category/${category}/${id}`)
    setProduct(res.data);
  };

  useEffect(() => {
    handleData();
    handleProductData();
  }, [id, category]);


  return (
    <div className="w-full px-3 md:px-10 lg:px-28 py-4">
      <Heading
        value = {new HeadingClass("Related Products", "start")}  
      />

      <div className="flex gap-4 flex-wrap py-3">
        {productData == null ? (
          [...Array(3)].map((_, i)=> <CardSkeleton key={i}/>)
        ) : (
          productData.map((item, idx) => {
              let off =
              ((item.productPrice - item.offerPrice) / item.productPrice) * 100;
            off = Math.abs(Math.round(off));

            item.off = off;
            return (
              <Card value={{item, idx}} key={idx}/>
            );
          })
        )
        }
      </div>
    </div>
  );
};

export default RelatedProducts;
