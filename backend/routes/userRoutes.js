import express from 'express';
import { test, updateUser, deleteUser, logout } from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyUser, updateUser);
router.delete('/delete/:userId', verifyUser, deleteUser);
router.post('/logout', logout);

export default router;