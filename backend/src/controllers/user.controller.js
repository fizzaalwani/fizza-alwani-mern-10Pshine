import userModel from '../models/user.js'

export const getProfile=async(req,res,next)=>{
    try{
        const user=await userModel.findById(req.user).select('-password -refreshToken')
        res.status(200).json({
            success:true,
            user
        })
    }catch(err){
        next(err)
    }
}


export const updateProfile=async(req,res, next)=>{
    try{
        const {name}=req.body
        const user=await userModel.findById(req.user)

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not exists"
            })
        }
        user.name=name || user.name

        await user.save()

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully"
        })

    }catch(err){
        next(err)
    }
}