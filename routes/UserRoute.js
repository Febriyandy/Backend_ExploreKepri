import express from "express";
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser, updatePassword, Home
} from "../controllers/Users.js";
//import { verifyToken } from "../middleware/VerifyToken.js";
//import { refreshToken } from "../controllers/RefreshToken.js";
const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/register', createUser);
router.patch('/users/:id', updateUser);
router.patch('/update/:id', updatePassword);
router.delete('/users/:id', deleteUser);
router.get('/', Home);
 
export default router;
