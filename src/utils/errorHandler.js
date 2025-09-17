import toast from "react-hot-toast"

export const handleError = (error, navigate=null)=>{
    if(error.response){
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
        console.log(error.response.data.error.statusCode)
        if (error?.response?.data?.error?.statusCode == 401 && navigate) {
            setTimeout(()=>{
                navigate("/login")
            }, 100)
        }
    }
    else if(error.request){
        toast.error("No response from server. Please check your internet or try again.")
        console.log("No response from server. Please check your internet or try again.")
    }
    else{
        toast.error(error?.message || "Unexpected Error")
        console.log(error?.message || "Unexpected Error")
    }
}