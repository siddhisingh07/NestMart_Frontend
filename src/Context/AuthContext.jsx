import axios from 'axios';
import {createContext, useState, useEffect} from 'react'
import toast from 'react-hot-toast';
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartSize, setCartSize] = useState("")

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
    try {
      // const res = await apiRequest("GET", "/users/me")
        const res = await axios.get(`${baseURL}/users/me`, {
        withCredentials: true,
      });
      setUser(res.data.data)
      console.log(res.data.data, "data")
    } catch (error) {
      setUser(null)
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
    };
    checkAuth();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser , loading, setLoading, cartSize, setCartSize  }}>
      {children}
    </authContext.Provider>
  );
};
