// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import React, { useState, useEffect } from 'react';  // Import hooks

// const List = ({token}) => {
//   const [list, setList] = useState([])
//   const fetchList = async ()=>{
//    try {
//       const response  = await axios.get(backendUrl + '/api/product/list', {headers:{token}})
//       if (response.data.success) {
//         console.log(response.data.products);
//         setList(response.data.products);
//       }else{
//         toast.error(response.data.message)
//       }
      
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
      
      
//     }

//   }

// const removeProduct = async (id)=>{

//   try {
//     const response = await axios.post(backendUrl + '/api/product/remove', {id},  {headers:{token}} )
//     if (response.data.success) {
//       toast.success(response.data.message)
//       await fetchList();
      
//     }else{
//       toast.error(response.data.message)
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error(error.message)
    
//   }

// }



//   useEffect(() => {
//     fetchList()
    
   
//   },[])
  
//   return (
    
//     <>
//     <p className='mb-2'>All product</p>
//     <div className='flex flex-col gap-2'>
//       {/* ---------List table table----------- */}
//       <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
//         <b>Image</b>
//         <b>Name</b>
//         <b>Category</b>
//         <b>Price</b>
//         <b className='text-center'>Action</b>


//       </div>

//       {/* -------product List-------- */}
//       {
//         list.map((item, index)=>(
//           <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//             <img className='w-12' src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>
            

//           </div>
//         ))
//       }
//     </div>
    
//     </>
//   )
// }

// export default List



import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react';
import { Trash2, Image } from 'lucide-react';

const List = ({token}) => {
  const [list, setList] = useState([])
  const fetchList = async ()=>{
   try {
      const response  = await axios.get(backendUrl + '/api/product/list', {headers:{token}})
      if (response.data.success) {
        console.log(response.data.products);
        setList(response.data.products);
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id},  {headers:{token}} )
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  },[])
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] bg-gray-100 text-gray-600 text-sm font-medium py-3 px-6 border-b">
          <div className="flex items-center justify-center">
            <Image className="w-5 h-5 text-gray-500" />
          </div>
          <div>Product Name</div>
          <div>Category</div>
          <div>Price</div>
          <div className="text-center">Actions</div>
        </div>

        {list.map((item, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center py-4 px-6 border-b hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center justify-center">
              <img 
                src={item.image[0]} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded-md shadow-sm" 
              />
            </div>
            <div className="font-medium text-gray-800">{item.name}</div>
            <div className="text-gray-600">{item.category}</div>
            <div className="font-semibold text-green-600">{currency}{item.price}</div>
            <div className="flex justify-center">
              <button 
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile List */}
      <div className="md:hidden">
        {list.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <img 
                src={item.image[0]} 
                alt={item.name} 
                className="w-10 h-10 object-cover rounded-md" 
              />
              <div>
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">{item.category}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="font-semibold text-green-600">{currency}{item.price}</div>
              <button 
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {list.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found. Add some products to get started!
        </div>
      )}
    </div>
  )
}

export default List
