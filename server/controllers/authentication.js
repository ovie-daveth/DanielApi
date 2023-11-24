import User from '../schema/user.js';
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
        
        const id = nanoid()

        const newUser = {
            id,
            username,
            email,
            passwordHash,
        };

        User.push(newUser);

        const token = jwt.sign({ id }, JWT_SECRET);

        req.session.authToken = token
        req.session.isLoggedIn = true

        res.status(StatusCodes.CREATED).json({message: 'User saved successfully', data: {
            id, username, email
        }})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
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
        const user = User.find(user => user.email === email)

        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Account with the email does not exist'})
        }

        // check if provided password matches
        const isMatch = await bcrypt.compare(password, user.passwordHash)

        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid credentials'})
        }
        

        const token = jwt.sign({id: user.id}, JWT_SECRET)

        req.session.authToken = token;
        req.session.isLoggedIn = true;

        res.status(StatusCodes.OK).json({message: 'login successful', data: {id: user.id, email, username: user.username}})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}

export const signout = (req, res) => {
    req.session.destroy()
}