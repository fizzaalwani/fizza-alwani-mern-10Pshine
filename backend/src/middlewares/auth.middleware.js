import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'

export const protect=async(req,res,next)=>{
        const token=req.headers.authorization?.split(" ")[1]

        if(!token) return res.status(401).json({success:false, message: "Unauthorized"})

            try{
                const decoded=jwt.verify(token,process.env.JWT_SECRET)
                console.log("decoded access token user id :",decoded)
                let user=await userModel.findById(decoded.id)
                if(!user) return res.status(401).json({success:false, message: "Unauthorized"})

                req.user=user._id
                next()

            }catch(err){
                 res.status(401).json({ success:false,message: "Invalid token" });
            }

}