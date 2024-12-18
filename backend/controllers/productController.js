import { v2 as cloudinary } from "cloudinary"
import productModel from '../models/productModel.js'

// function for add product
const addProduct = async (req, res)=>{
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body
       
         // Check if sizes is provided and is a valid JSON string
         let parsedSizes = [];
         if (sizes) {
             try {
                 parsedSizes = JSON.parse(sizes);  // Attempt to parse sizes
             } catch (parseError) {
                 // If parsing fails, return an error
                 return res.status(400).json({ success: false, message: "Invalid sizes format. Please provide a valid JSON string." });
             }
         }
       
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 &&  req.files.image2[0]
        const image3 = req.files.image3 &&  req.files.image3[0]
        const image4 = req.files.image4 &&  req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item != undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )
        
        const productData ={
            name,
            description,
            price : Number(price),
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()

        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save();
        
        
        res.json({success:true, message:"product Added" })
        
    } catch (error) {
        res.json({success:false, message:error.message} )
        console.log(error);
        
    }

}

// function for list product
const listProduct = async (req, res)=>{

    try {
        const products = await productModel.find({})
            res.json({success:true, products})
        
    } catch (error) {
        res.json({success:false, message:error.message} )
        console.log(error);
        
        
    }

}

// function for removing product
const removeProduct = async (req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"product removed"})


    } catch (error) {
        res.json({success:false, message:error.message} )
        console.log(error);
        
        
    }

}

// function for single product info
const singleProduct = async (req, res)=>{
    try {
        const { productid } = req.body
        const product = await productModel.findById(productid)
        res.json({success:true, product})

    } catch (error) {
        res.json({success:false, message:error.message} )
        console.log(error);
        
        
    }

}


export {listProduct, addProduct,removeProduct,singleProduct}

// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// // Add product
// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//         // Parse sizes if provided
//         let parsedSizes = [];
//         if (sizes) {
//             try {
//                 parsedSizes = JSON.parse(sizes);
//             } catch {
//                 return res.status(400).json({ success: false, message: "Invalid sizes format" });
//             }
//         }

//         // Handle images
//         const images = ["image1", "image2", "image3", "image4"]
//             .map((field) => req.files[field]?.[0])
//             .filter(Boolean);

//         // Upload images to Cloudinary
//         const imagesUrl = await Promise.all(
//             images.map(async (item) => {
//                 const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
//                 return result.secure_url;
//             })
//         );

//         // Create product data
//         const productData = {
//             name,
//             description,
//             price: Number(price),
//             category,
//             subCategory,
//             sizes: parsedSizes,
//             bestseller: bestseller === "true",
//             image: imagesUrl,
//             date: new Date(),
//         };

//         // Save product to database
//         const product = new productModel(productData);
//         await product.save();

//         res.status(201).json({ success: true, message: "Product added successfully!", product });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//         console.error(error);
//     }
// };

// // List products
// export const listProduct = async (req, res) => {
//     try {
//         const products = await productModel.find({});
//         res.status(200).json({ success: true, products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Remove product
// export const removeProduct = async (req, res) => {
//     try {
//         await productModel.findByIdAndDelete(req.body.id);
//         res.status(200).json({ success: true, message: "Product removed successfully!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Single product
// export const singleProduct = async (req, res) => {
//     try {
//         const product = await productModel.findById(req.body.productid);
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }
//         res.status(200).json({ success: true, product });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
