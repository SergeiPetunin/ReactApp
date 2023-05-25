import express from 'express';
import { getUsers, Register, Login, Logout, getUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../controllers/refreshToken.js';

const userrouter = express.Router();
userrouter.get('/users', getUsers); //verifyToken,
userrouter.get('/user', verifyToken, getUser);
userrouter.post('/register', Register);
userrouter.post('/login', Login);
userrouter.get('/token', refreshToken);
userrouter.delete('/logout', Logout);

export default userrouter;