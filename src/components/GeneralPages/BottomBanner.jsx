import { banner_bottom } from '../../Assets/Assets'

const BottomBanner = () => {
  return (
   <>
     <div className="min-h-96 w-full bg-gray-50 flex items-center justify-center px-0 md:px-10 lg:px-28 py-2">
           <div
             className="h-[80vh] relative md:h-[65vh] lg:h-[75vh] w-full containerBannerBottom rounded bg-cover flex items-start py-20 md:py-20 lg:py-32 flex-col px-2 md:px-16  lg:px-32"
           >
             <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#253d4e] font-semibold leading-11 lg:leading-none  bg-red ">
               Stay home &amp; get your daily <br/>  needs from our shop 
             </h1>
             {/* <h1 className="text-7xl text-[#253d4e] font-bold"></h1> */}
             <h3 className="text-xl lg:text-xl  text-gray-400 font-light  mt-4 lg:mt-6">
              Start Your Daily Shopping with <span className="text-green">Nest Mart</span>
             </h3>
             <div className=" rounded-full w-80 md:w-96 lg:w-[30rem] mt-10 flex bg-slate-50">
               <input
                 type="text"
                 className="bg-transparent text-gray-600 h-full w-full lg:px-8 px-4 px py-2 lg:py-5 rounded-full focus:border-none focus:outline-none placeholder:text-lg placeholder:font-normal"
                 placeholder="Your email address"
               />
               <button className="py-4 px-8 rounded-full bg-[#3bb77e] text-gray-50 text-lg">
                 Suscribe
               </button>
             </div>
              <img src={banner_bottom} className='md:w-[35rem] md:h-[30rem] w-[15rem] h-[15rem] object-contain object-center absolute md:bottom-[-5.4rem] bottom-[-4.5rem] right-0' alt="" />
           </div>
           
         </div>
   </>
  )
}

export default BottomBanner