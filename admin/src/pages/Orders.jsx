// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/order/list",
//         {},
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         setOrders(response.data.orders.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const statusHandler =async (event, orderId)=>{
//     try {
//       const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:event.target.value }, {headers:{token}} )
//     if (response.data.success) {
//       await fetchAllOrders()
//       toast.success("Order status updated!");
//     }
    
//     } catch (error) {
//       console.log(error);
      
//       toast.error(response.data.message);
//     }

//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {orders.map((order, index) => (
//           <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
//             <img className="w-12" src={assets.parcel_icon} />
//             <div>
//               <div>
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return (
//                       <p className="py-0.5" key={index}>
//                         {" "}
//                         {item.name} x {item.quantity} <span>{item.size}</span>
//                       </p>
//                     );
//                   } else {
//                     return (
//                       <p className="py-0.5" key={index}>
//                         {" "}
//                         {item.name} x {item.quantity} <span>{item.size} </span>,
//                       </p>
//                     );
//                   }
//                 })}
//               </div>
//               <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
//               <div>
//                 <p>{order.address.street + " ,"}</p>
//                 <p>
//                   {order.address.city +
//                     " ," +
//                     order.address.state +
//                     "," +
//                     order.address.country +
//                     "," +
//                     order.address.zipcode}
//                 </p>
//               </div>
//               <p>{order.address.phone}</p>
//             </div>
//             <div>
//                       <p className="text-sm sm:text-[15px]">items: {order.items.length}</p>
//                       <p className="mt-3">Methods: {order.paymetMethod}</p>
//                       <p>Payment: {order.payment ? "Done": "Pending"}</p>
//                       <p>Date: {new Date(order.date).toLocaleDateString()}</p>

//             </div>
//             <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
//             <select  value={order.status} onChange={(event)=>statusHandler(event, order._id )} className="p-2 font-semibold">
//               <option value="Order placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="delivered">Delivered</option> 
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Package, CheckCircle, TruckIcon, MapPin } from 'lucide-react'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status', 
        { orderId, status: event.target.value }, 
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusIcons = {
    "Order placed": <Package className="text-blue-500" />,
    "Packing": <Package className="text-yellow-500" />,
    "Shipped": <TruckIcon className="text-green-500" />,
    "Out for delivery": <MapPin className="text-orange-500" />,
    "delivered": <CheckCircle className="text-green-600" />
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Package className="mr-3" /> Order Management
      </h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div 
            key={index} 
            className="
              bg-white 
              rounded-xl 
              shadow-md 
              hover:shadow-lg 
              transition-shadow 
              duration-300 
              p-6 
              border 
              border-gray-100
            "
          >
            <div className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4">
              <div className="flex items-center justify-center">
                {statusIcons[order.status] || <Package />}
              </div>
              
              <div>
                <div className="mb-2">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-700">
                      {item.name} x {item.quantity} ({item.size})
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </p>
                  ))}
                </div>
                <p className="font-semibold text-gray-800 mt-2">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="text-sm text-gray-600">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state}, 
                    {order.address.country} {order.address.zipcode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-700">
                <p>Items: {order.items.length}</p>
                <p>Payment: {order.paymetMethod}</p>
                <p>{order.payment ? "Paid" : "Pending"}</p>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              
              <div className="font-semibold text-blue-700">
                {currency}{order.amount}
              </div>
              
              <select 
                value={order.status} 
                onChange={(event) => statusHandler(event, order._id)} 
                className="
                  w-full 
                  p-2 
                  border 
                  rounded 
                  text-sm 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              >
                {Object.keys(statusIcons).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders