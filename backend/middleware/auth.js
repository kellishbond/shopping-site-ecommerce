// import jwt from 'jsonwebtoken'


// const authUser = async (req, res, next)=>{
//     const {token} = req.headers;
    
//     if (!token) {
//         return res.json({success:false, message: "Not Authorized Login Again"})
//     }

//     try {
//         const token_decode =jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.userId
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message:error.message})
        
//     }
// }

// export default authUser;


import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) { 
        return res.status(401).json({ success: false, message: "Not Authorized. Please Login Again" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Log the decoded token to see its structure
        console.log('Decoded Token:', decoded);

        // Ensure we're using the correct property for user ID
        const userId = decoded.id || decoded._id;

        if (!userId) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token: User ID not found" 
            });
        }

        // Add userId to the request body
        req.body.userId = userId;
        
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired" });
        }

        res.status(500).json({ success: false, message: "Authentication error" });
    }
};

export default authUser;