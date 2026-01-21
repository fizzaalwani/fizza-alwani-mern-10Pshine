import jwt from 'jsonwebtoken'
import userModel from '../db/models/user'

export const protect=async(req,res,next)=>{
        const token=req.headers.authorization?.split(" ")[1]

        if(!token) return res.status(401).json({success:false, message: "Unauthorized"})

            try{

                const decoded=jwt.verfity(token,process.env.JWT_SECRET)
                let user=await userModel.findOne({_id:decoded.id})
                if(!user) return res.status(401).json({success:false, message: "Unauthorized"})

                req.user=user_id
                next()


            }catch(err){
                 res.status(401).json({ success:false,message: "Invalid token" });
            }


}