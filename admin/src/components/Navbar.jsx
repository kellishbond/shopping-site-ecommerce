// import React from 'react'
// import {assets} from '../assets/assets'

// const Navbar = ({setToken}) => {
//   return (
//     <div className='flex items-center py-2 px-[4%] justify-between'>
//         <img className='w-[max(10%, 80px)]' src={assets.logoo}/>
//         <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2   sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    
//     </div>
//   )
// }

// export default Navbar

import React from 'react'
import { assets } from '../assets/assets'
import { LogOut } from 'lucide-react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-4 px-[4%] bg-white shadow-sm'>
      <img 
        className='w-[max(10%, 100px)] h-auto object-contain' 
        src={assets.logoo} 
        alt="Logo" 
      />
      <button 
        onClick={() => setToken('')} 
        className='
          flex items-center gap-2 
          bg-red-500 text-white 
          px-5 py-2 rounded-full 
          hover:bg-red-600 
          transition-colors 
          text-sm font-medium
          shadow-md hover:shadow-lg
        '
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  )
}

export default Navbar
