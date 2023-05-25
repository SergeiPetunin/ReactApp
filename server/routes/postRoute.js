import express from 'express';

import { 
    getAllPosts, 
    getPostById, 
    getPostByIdCategory,
    createPost,
    deletePost,
    updatePost,
} from '../controllers/postController.js';

const postrouter = express.Router();

postrouter.get('/', getAllPosts);
postrouter.get('/:id', getPostById);
postrouter.get('/category/:id', getPostByIdCategory);
postrouter.post('/', createPost);
postrouter.patch('/:id', updatePost);
postrouter.delete('/:id', deletePost);

export default postrouter;