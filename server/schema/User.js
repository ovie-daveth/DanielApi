import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  personalInfo: {
    username: String,
    email: {type: String, required: true, unique: true},
    password: String,
  }
}, {timestamps: true});

export default model('User', userSchema)