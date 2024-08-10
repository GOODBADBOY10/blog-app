import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/postController.js';


const router = express.Router();

router.post('/create', verifyUser, create)
router.get('/getposts', getposts)


export default router;