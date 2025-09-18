import { useContext, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Add_Products from "./Add_Products";
import Product_list from "./Product_list";
import { GoLog, GoTasklist } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { authContext } from "../../Context/AuthContext";
import OrdersList from "./OrdersList";
import { apiRequest } from "../../utils/apiRequest";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("add_product");
  let { setUser } = useContext(authContext);

  const logout = async () => {
    try {
      let res = await apiRequest("GET", "/admin/logout");
      setUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-[250px] md:h-full py-2 border overflow-y-auto">
        <div
          className={`cursor-pointer text-gray-800 px-4 py-3 text-lg font-light ${
            activeTab == "add_product"
              ? "bg-light_green hover:bg-light_green border-r-4 border-green"
              : "bg-gray-50 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("add_product")}
        >
          <IoIosAddCircleOutline className="inline-block text-xl mr-1" /> Add Product
        </div>
        <div
          className={`cursor-pointer text-gray-800 px-4 py-3 text-lg font-light ${
            activeTab == "product_list"
              ? "bg-light_green hover:bg-light_green border-r-4 border-green"
              : "bg-gray-50 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("product_list")}
        >
          <GoTasklist className="inline-block text-xl mr-1" /> Product List
        </div>
        <div
          className={`cursor-pointer text-gray-800 px-4 py-3 text-lg font-light ${
            activeTab == "orders"
              ? "bg-light_green hover:bg-light_green border-r-4 border-green"
              : "bg-gray-50 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          <IoMdCheckboxOutline className="inline-block text-xl mr-1" />
          Orders
        </div>
        <div
          className={`cursor-pointer text-gray-800 px-4 py-3 text-lg font-light ${
            activeTab == "logout"
              ? "bg-light_green hover:bg-light_green border-r-4 border-green"
              : "bg-gray-50 hover:bg-gray-200"
          }`}
          onClick={() => {
            setActiveTab("logout");
            logout();
          }}
        >
          <GoLog className="inline-block text-xl mr-2" />
          Logout
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-[75%] h-full border overflow-y-auto">
        {activeTab == "add_product" && <Add_Products />}
        {activeTab == "product_list" && <Product_list />}
        {activeTab == "orders" && <OrdersList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
