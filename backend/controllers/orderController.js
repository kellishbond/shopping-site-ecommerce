import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razorpay from 'razorpay'

// globa variables
const currency = 'USD'; 
const deliveryCharge = 10

// gateway initialise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// })

// placing order using cash on delivery
const  placeOrder = async (req, res) =>{
    try {
        const {userId, items, amount , address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData : {}})

        res.json({success: true, message: "Order Placed"})


    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        
        
    }

}
 
// placing order using stripe
const  placeOrderStripe = async (req, res) =>{
    try{
        const {userId, items, amount , address } = req.body;
        // const {origin} = req.headers;
        const origin = req.headers.origin || 'http://http://localhost:5173/'; // Replace with your default frontend URL
        console.log("Origin: ", origin); // Log the origin

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'stripe',
            payment: false,
            date: Date.now()
        }
        
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items  = items.map((item)=>({
            price_data: {
                currency :  currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
    }))

    line_items.push({
        price_data: {
            currency :  currency,
            product_data: {
                name:'Delivery Charges'
            },
            unit_amount: deliveryCharge * 100
        },
        quantity: 1

    })

    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',

    })
    res.json({success:true, session_Url: session.url})
    }catch(error){

        console.log(error);
        res.json({success: false, message:error.message})
        

    }

}

// verify stripe
const verifyStripe = async (req, res) =>{
    const {orderId, success, userId} =req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true});

        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        

        
    }
}

// placing order Razorpay stripe
// const  placeOrderRazorpay = async (req, res) =>{

//     try {
//         const {userId, items, amount , address } = req.body;
    

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: 'Razorpay',
//             payment: false,
//             date: Date.now()
//         }
        
//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount : amount * 100,
//             currency:currency.toUpperCase(),
//             receipt : newOrder._id.toString()
//     } 
//         await razorpayInstance.orders.create(options, (error, order)=>{
//             if (error) {
//                 console.log(error);
//                 return res.json({success:false , message: error})
                
                
//             } res.json({success: true, order})
//         })


// }catch (error) {
//         console.log(error);
//         res.json({success: false, message:error.message})
        
        
//     }

// }


// AllOrders data for Admin pannel
const allOrders = async (req, res)=>{

    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        
        
    }
    
}

// user Order data for frontend
const userOrders = async (req, res)=>{
    try {
        
        const{userId}= req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        
         
    }

} 

// update order status from Admin Pannel
const updateStatus = async (req, res)=>{
    try {
        const {orderId, status} =req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: 'Status updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}

export {verifyStripe, placeOrder,  placeOrderStripe, allOrders,userOrders, updateStatus}