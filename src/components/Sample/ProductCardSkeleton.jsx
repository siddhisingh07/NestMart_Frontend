import React from 'react'

const ProductCardSkeleton = () => {
  return (
   <div className="w-full lg:w-2/3 flex flex-col gap-4 animate-pulse">
  {/* Sale Badge */}
  <div className="w-24 h-6 bg-green-100 rounded"></div>

  {/* Product Title */}
  <div className="w-2/3 h-8 bg-gray-200 rounded"></div>

  {/* Stars */}
  <div className="flex gap-2">
    {Array(5)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="w-5 h-5 bg-yellow-100 rounded-full"></div>
      ))}
  </div>

  {/* Price Section */}
  <div className="flex flex-col gap-2">
    <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
    <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
    <div className="w-1/4 h-3 bg-gray-200 rounded"></div>
  </div>

  {/* Description */}
  <div className="w-full h-20 bg-gray-200 rounded"></div>

  {/* Stock Info */}
  <div className="w-32 h-4 bg-yellow-100 rounded"></div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
    <div className="h-12 bg-green-100 w-full sm:w-1/2 rounded-sm"></div>
    <div className="h-12 bg-green-300 w-full sm:w-1/2 rounded-sm"></div>
  </div>
</div>

  )
}

export default ProductCardSkeleton