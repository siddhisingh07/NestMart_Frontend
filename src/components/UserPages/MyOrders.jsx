import axios from "axios";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { base_url } from "../../constant";
import { apiRequest } from "../../utils/apiRequest";

const MyOrders = () => {
  const [data, setData] = useState([]);

  const showData = async () => {
    try {
      let res = await apiRequest("GET", "/order/my-orders");
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-28 py-4">
      <Heading value={new HeadingClass("My Orders", "start")} />

      <div className="w-full md:w-5/6 lg:w-2/3 flex flex-col gap-5 mt-5">
        {data.length === 0 ? (
          <h1 className="text-gray-500">You haven't ordered yet</h1>
        ) : (
          data.map((order) => (
            <div
              key={order._id}
              className="border px-4 py-3 rounded text-gray-600"
            >
              {/* Order Info */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm mb-3">
                <span className="break-all">OrderId: {order._id}</span>
                <span>Payment: {order.paymentStatus ? "Paid" : "Unpaid"}</span>
                <span>Total Amount: ${order.totalAmount}</span>
              </div>

              {/* Products */}
              {order?.orderItems?.map((p, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t py-2 gap-3"
                >
                  {/* Product Info */}
                  <div className="flex gap-3 sm:gap-5">
                    <img
                      src={p?.product?.front || "https://via.placeholder.com/100"}
                      className="h-24 w-24 object-cover shadow rounded"
                      alt={p?.product?.productName}
                    />
                    <div>
                      <h1 className="text-lg font-semibold text-navy">
                        {p?.product?.productName}
                      </h1>
                      <h1 className="text-sm">Category: {p?.product?.category}</h1>
                    </div>
                  </div>

                  {/* Status Info */}
                  <div className="text-sm">
                    <h1>Status: {order?.orderStatus || "Pending"}</h1>
                    <h1>Quantity: {p?.quantity}</h1>
                    <h1>
                      Date:{" "}
                      {new Date(order?.createdAt || Date.now()).toLocaleDateString()}
                    </h1>
                  </div>
                </div>
              ))}

              {/* Shipping Address */}
              <div className="mt-2 text-sm">
                <h1>Shipping: {order?.shippingAddress}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
