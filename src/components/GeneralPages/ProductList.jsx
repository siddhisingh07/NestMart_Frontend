import { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "../Common/Card";
import { CardSkeleton } from "../Sample/CardSkeleton";
import { base_url } from "../../constant";
import { apiRequest } from "../../utils/apiRequest";

const ProductList = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(null);

  const handleProductList = async () => {
    try {
      let res = await apiRequest("GET", "/users/products")
      // let res = await axios.get(`${base_url}/users/products`);
      setProductList(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = (id, category) => {
    navigate(`${category}/${id}`);
  };

  useEffect(() => {
    handleProductList();
  }, []);

  return (
    <div className="w-full px-3 md:px-10 lg:px-28 bg-gray-50 py-8">
      <Heading value={new HeadingClass("Your daily choice", "start", 80, 20)} />

      <div className="flex gap-4 flex-wrap">
        {productList == null
          ? [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
          : productList.map((item, idx) => {
              let off =
                ((item.productPrice - item.offerPrice) / item.productPrice) *
                100;
              off = Math.abs(Math.round(off));
              item.off = off;
              return <Card value={{ item, idx }} />;
            })}
      </div>
    </div>
  );
};

export default ProductList;
