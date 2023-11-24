import User from '../schema/user.js';
import {  StatusCodes } from 'http-status-codes';

export const signup = (req, res) => {
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
    console.log("Daniel")
    const id = User.length + 1

    const newUser = {
        id,
        username,
        email,
        password
    };

    User.push(newUser);

    res.status(StatusCodes.CREATED).json({message: 'User saved successfully', data: {
        id, username, email
    }})

    console.log(User)
}

export const signin = (req, res) => {
    const { email, password } = req.body   

    if(!email){
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please enter a valid email address'})
    }
    if(!password.length > 5 || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Password must be at least 5 characters long'})
    }

    const user = User.find(user => user.email === email)

    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Account with the email does not exist'})
    }

    res.status(StatusCodes.OK).json({message: 'login successfull'})
}