import axios from "axios"
import { handleError } from "./errorHandler";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL,
    withCredentials : true
})

export const apiRequest = async(method, url, data= {}, navigate=null)=>{

    try {
        const response = await api({method, url, data});
        return response.data
    } catch (error) {
        handleError(error, navigate)
        console.log(error)
        throw error
    }
}