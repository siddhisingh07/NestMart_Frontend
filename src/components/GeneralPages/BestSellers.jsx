import { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import axios from "axios";
import toast from "react-hot-toast";
import { Card } from "../Common/Card";
import { CardSkeleton } from "../Sample/CardSkeleton";
import { base_url } from "../../constant";
import { apiRequest } from "../../utils/apiRequest";

const BestSellers = () => {
  const [productList, setProductList] = useState(null);

  // Card-specific hover state

  const handleProductList = async () => {
    try {
      let res = await apiRequest("GET", "/users/best-sellers")
      setProductList(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleProductList();
  }, []);

  return (
    <div className="w-full px-3 md:px-10 lg:px-28 bg-gray-50 py-8">
      <Heading value={new HeadingClass("Best Sellers", "start", 80, 20)} />

      <div className="flex gap-4 flex-wrap items-center justify-center md:items-start md:justify-start">
        {productList == null ? (
          [...Array(4)].map((_, i)=> <CardSkeleton key={i}/> )
        ) : (
          productList.map((item, idx) => {
            let off =
              ((item.productPrice - item.offerPrice) / item.productPrice) * 100;
            off = Math.abs(Math.round(off));

            item.off = off;

            return (
              <Card value={{ item, idx }} key={idx} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default BestSellers;
