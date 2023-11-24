import express from 'express';
import { signin, signup } from '../controllers/authentication.js';


const router = express.Router();

router.route('/signup').post(signup)
router.route('/signin').post(signin)
// router.get('/', getUser)

export default router;