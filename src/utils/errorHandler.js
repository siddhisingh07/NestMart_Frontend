import toast from "react-hot-toast"

export const handleError = (error, navigate=null)=>{

    if(error.response){
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
        if (error.response?.status == 401 && navigate) {
            setTimeout(()=>{
                navigate("/login")
            }, 1000)
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