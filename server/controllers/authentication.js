import User from '../schema/User.js';
import {  StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'Dummy Secret';

export const signup = async (req, res) => {
    try {
        const saltRounds = 10
        const { username, email, password } = req.body;

        if(!username){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Username is required for registration'})
        }
        if(!email){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please enter a valid email address'})
        }
        if(!password.length > 5 || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Password must be at least 5 characters long'})
        }

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const data = {
            username, email
        }
        
        await User.init()
        const user = await User.create({
            personalInfo: {
                ...data,
                password: passwordHash
            }
        })

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        req.session.authToken = token
        req.session.isLoggedIn = true

        res.status(StatusCodes.CREATED).json({message: 'User saved successfully', data})

    } catch (error) {
        if(error.code === 11000){
            return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Account with email exists already, Log in'})
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error})
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body   

        if(!email){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please enter a valid email address'})
        }
        if(!password.length > 5 || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Password must be at least 5 characters long'})
        }

        // check if user with the email address exists
        const user = await User.findOne({ 'personalInfo.email': email }).exec()

        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Invalid email or password'})
        }

        // check if provided password matches
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.personalInfo.password)

        if(!isMatch){
            return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Invalid email or password'})
        }
        
        const data = {
            id: user._id,
            email: email,
            username: user.personalInfo.username,
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET)

        req.session.authToken = token;
        req.session.isLoggedIn = true;

        res.status(StatusCodes.OK).json({message: 'login successful', data})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}

export const signout = (req, res) => {
    req.session.destroy()
}