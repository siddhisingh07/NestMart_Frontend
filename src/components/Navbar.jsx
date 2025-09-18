import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart2, BsSearch } from "react-icons/bs";
import { logo, profile } from "../Assets/Assets";
import toast from "react-hot-toast";
import { authContext } from "../Context/AuthContext";
import { apiRequest } from "../utils/apiRequest";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, cartSize } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  console.log(user);
  const logout = async () => {
    try {
      let res = await apiRequest("GET", "/users/logout");
      toast.success(res.data.message);
      navigate("/login");
      setUser("");
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search-list?search=${query}`);
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-28 py-2 lg:py-3 border-b border-gray-300 bg-white relative z-50">
      <Link to="/">
        <img src={logo} className="h-10 sm:h-12" alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-4 md:gap-6 text-sm">
        <Link
          to="/admin-dashboard"
          className="px-3 border-light_green text-green inline-block border-2 rounded-xl"
        >
          Admin
        </Link>
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full"
        >
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BsSearch className="text-gray-800" />
        </form>

        {user && (
          <>
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <BsCart2 />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartSize || 0}
                </button>
              </div>
            </Link>

            <div ref={dropdownRef} className="relative ml-2">
              <img
                src={profile}
                alt="profile"
                className="h-9 w-9 cursor-pointer rounded-full"
                onClick={() => setIsOpen((prev) => !prev)}
              />

              {isOpen && (
                <div className="bg-gray-50 border text-gray-800 rounded mt-5 absolute top-7 right-0 shadow z-50 w-28">
                  <Link to="/my-orders">
                    <div className="hover:bg-light_green cursor-pointer py-2 px-3 text-sm">
                      My Orders
                    </div>
                  </Link>
                  <div
                    className="hover:bg-light_green cursor-pointer py-2 px-3 text-sm"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </div>
                  <div
                    className="hover:bg-light_green cursor-pointer py-2 px-3 text-sm"
                    onClick={() =>{ setIsOpen(false); navigate("/cart")}}
                  >
                    Cart
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!user && (
          <Link
            to="/login"
            className="cursor-pointer px-6 py-1.5 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-3 px-5 text-sm sm:hidden transition-all z-40`}
      >
        {/* Search */}
        <form
          onSubmit={(e) => {
            handleSearch(e);
            setOpen(false);
          }}
          className="flex w-full items-center border border-gray-300 px-3 rounded-full"
        >
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-sm"
            type="text"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BsSearch className="text-gray-800" />
        </form>

        <Link
          className="w-full py-2 border-b"
          to="/"
          onClick={() => setOpen(false)}
        >
          Home
        </Link>
        <Link
          className="w-full py-2 border-b"
          to="/products"
          onClick={() => setOpen(false)}
        >
          All Products
        </Link>


        <Link
          className="w-full py-2 border-b"
          to="/admin-dashboard"
          onClick={() => setOpen(false)}
        >
          Admin
        </Link>

        {/* {user.UserType === "admin" && (
        <Link className="w-full py-2 border-b" to="/admin-dashboard" onClick={() => setOpen(false)}>
          Dashboard
        </Link>
      )} */}

        {user?.userType == "user" && (
          <>
            <Link
              className="w-full py-2 border-b"
              to="/my-orders"
              onClick={() => setOpen(false)}
            >
              My Orders
            </Link>
            <Link
              className="w-full py-2 border-b flex items-center"
              to="/cart"
              onClick={() => setOpen(false)}
            >
              Cart
            </Link>
          </>
        )}

        {!user ? (
          <Link
            to="/login"
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-center rounded-md"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-center rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
