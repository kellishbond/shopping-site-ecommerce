// // add product to user cart
 import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId, size } = req.body;

    // Validate inputs
    if (!userId || !itemId || !size) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Ensure cartData exists, initialize if not
    userData.cartData = userData.cartData || {};

    // Deep clone the cartData to ensure a complete copy
    let cartData = JSON.parse(JSON.stringify(userData.cartData));

    // Initialize item if not exists
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update or add the specific size
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    // Update the user's cart data
    userData.cartData = cartData;
    await userData.save();

    res.json({ success: true, message: "Added To Cart", cartData });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      errorDetails: error.message 
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId, size, quantity } = req.body;

    // Validate inputs
    if (!userId || !itemId || !size || quantity === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Ensure cartData exists
    userData.cartData = userData.cartData || {};

    // Deep clone the cartData
    let cartData = JSON.parse(JSON.stringify(userData.cartData));

    // Initialize item if not exists
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update the specific size quantity
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      // Remove the size if quantity is 0
      delete cartData[itemId][size];
      
      // If no sizes left for the item, remove the item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    // Update the user's cart data
    userData.cartData = cartData;
    await userData.save();

    res.json({ success: true, message: "Cart Updated", cartData });
  } catch (error) {
    console.error('Update Cart Error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      errorDetails: error.message 
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true, 
      cartData: userData.cartData || {} 
    });
  } catch (error) {
    console.error('Get User Cart Error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      errorDetails: error.message 
    });
  }
};

export { addToCart, updateCart, getUserCart };
 