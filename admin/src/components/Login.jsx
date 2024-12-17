// import React, { useState } from 'react'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'

// const Login = ({setToken}) => {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const onSubmitHandler = async(e)=>{
//         try {
//             e.preventDefault();
//             const response = await axios.post(backendUrl + "/api/user/admin",{email, password})
//             if (response.data.success){
//                 setToken(response.data.token)
//             }
//             else{
//                 toast.error(response.data.message)
//             }
            

            
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
            
//         }

//     }

//   return (
//     <div className='min-h-screen flex items-center justify-center w-full'>
//         <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md ' >
//             <h1 className='text-2xl font-bold mb-4'>Admin Pannel</h1>
//             <form onSubmit={onSubmitHandler}>
//                 <div className='mb-3 min-w-72'>
//                     <p className='text:sm  font-medium text-gray-700 mb-2'>Email address</p>
//                     <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 border border-gray-300 outline-none '  type="email"  placeholder='your@email.com' required/>
                    
//                 </div>
//                 <div className='mb-3 min-w-72'>
//                     <p className='text:sm  font-medium text-gray-700 mb-2'>Password</p>
//                     <input  onChange={(e)=>setPassword(e.target.value)} value={password}  className='rounded-md w-full px-3 border border-gray-300 outline-none ' type="password"  placeholder='Enter your password' required/>                    
//                 </div>
//                 <button className='mt-2 w-full py-2 px-4 rounded-md bg-black text-white ' type='submit'>Login</button>
//             </form>

//         </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Lock, Mail } from 'lucide-react'

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + "/api/user/admin", {email, password})
            if (response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center w-full px-4'>
            <div className='
                bg-white 
                shadow-2xl 
                rounded-2xl 
                px-8 py-10 
                max-w-md 
                w-full 
                border border-gray-100
            '>
                <div className='text-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Admin Panel</h1>
                    <p className='text-gray-500'>Secure Login</p>
                </div>
                <form onSubmit={onSubmitHandler} className='space-y-6'>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                className='
                                    w-full 
                                    pl-10 
                                    pr-4 
                                    py-3 
                                    border 
                                    border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-blue-500
                                '
                                type="email"  
                                placeholder='your@email.com' 
                                required
                            />
                        </div>
                    </div>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <input  
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}  
                                className='
                                    w-full 
                                    pl-10 
                                    pr-4 
                                    py-3 
                                    border 
                                    border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-blue-500
                                '
                                type={showPassword ? "text" : "password"}  
                                placeholder='Enter your password' 
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type='submit' 
                        className='
                            w-full 
                            py-3 
                            bg-blue-600 
                            text-white 
                            rounded-lg 
                            hover:bg-blue-700 
                            transition-colors 
                            font-semibold 
                            shadow-md 
                            hover:shadow-lg
                        '
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login