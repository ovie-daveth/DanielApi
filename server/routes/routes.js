import express from 'express';
import { signin, signup, signout } from '../controllers/authentication.js';


const router = express.Router();

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/signout').get(signout)

export default router;