import express from 'express'
import { getProfile, updateProfile } from '../controllers/user.controller.js'
import { protect } from '../middlewares/auth.middleware.js'


const router=express.Router()

router.get('/',protect,getProfile)
router.post('/update',protect,updateProfile)


export default router