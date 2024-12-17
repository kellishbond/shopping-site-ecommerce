// import React from 'react'
// import {NavLink} from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Sidebar = () => {



//   return (
   
//    <div className='w-[18%] min-h-screen border-r-2'>
//     <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
//       <NavLink   className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 rounded-l' to ='/add'>
//           <img className='w-5 h-5 ' src={assets.add_icon} alt="" />
//           <p className='hidden md:block'>Add Items</p>
//       </NavLink>
//       <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 rounded-l' to ='/List'>
//           <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
//           <p className='hidden md:block'>List Items</p>
//       </NavLink>
//       <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 rounded-l' to ='/Orders'>
//           <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
//           <p className='hidden md:block'>Orders</p>
//       </NavLink>
//     </div>
        
        
//     </div>
//   )
// }

// export default Sidebar

import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { 
  PlusCircle, 
  List, 
  ShoppingBag 
} from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { 
      to: '/add', 
      icon: <PlusCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />, 
      label: 'Add Items' 
    },
    { 
      to: '/List', 
      icon: <List className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />, 
      label: 'List Items' 
    },
    { 
      to: '/Orders', 
      icon: <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />, 
      label: 'Orders' 
    }
  ]

  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-50 shadow-sm'>
      <div className='flex flex-col gap-4 pt-8 pl-[15%]'>
        {navItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.to} 
            className={({ isActive }) => `
              group flex items-center gap-3 
              border border-gray-200 border-r-0 
              px-4 py-2 rounded-l-lg 
              transition-all duration-300 
              ${isActive 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'hover:bg-gray-100 hover:border-gray-300'}
            `}
          >
            {item.icon}
            <p className='hidden md:block text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors'>
              {item.label}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
