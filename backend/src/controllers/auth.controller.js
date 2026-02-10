import jwt from 'jsonwebtoken'
import userModel from "../models/user.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { generateAccessToken, generateRefreshToken } from '../utils/token.js'
import sendEmail from '../services/sendEmail.service.js'


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: user._id
        })

    } catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        let isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken
        })

    } catch (err) {
        console.log(err.message)
        next(err)
    }
}

export const refreshToken = async (req, res, next) => {

    const { refreshToken } = req.body

    if (!refreshToken) return res.sendStatus(401)

    const user = await userModel.findOne({ refreshToken })
    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)

        const newAccessToken = generateAccessToken(decoded.id)
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        })
    })

}

export const forgotPassword = async (req, res, next) => {
    try {

        const { email } = req.body
        let user = await userModel.findOne({ email })

        if (!user) return res.status(401).json({ success: true, message: "User not found" })

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetOTP = crypto.createHash("sha256").update(otp).digest("hex");
        user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendEmail({
            to: user.email,
            subject: "COFFEE NOTES OTP",
            text: `Your OTP is ${otp}`,
        });

        console.log("OTP (for now):", otp); // EMAIL LATER

        res.json({ success: true, message: "OTP sent" });

    } catch (err) {
        next(err)
    }

}

export const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body

        const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex")
        const user = await userModel.findOne({
            email,
            resetOTP: hashedOTP,
            resetOTPExpiry: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json({ success: false, message: "Invalid OTP" })

        user.password = newPassword
        user.resetOTP = undefined
        user.resetOTPExpiry = undefined

        await user.save()

        return res.status(200).json({ success: true, message: "Password reset successfully" })

    } catch (err) {
        next(err)
    }
}