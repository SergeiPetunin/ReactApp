import express from 'express';
import { 
    getAllCategories,
    getCategoryById,
    getAllCategoriesPosts,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';

const categoryrouter = express.Router();

categoryrouter.get('/', getAllCategories);
categoryrouter.get('/posts', getAllCategoriesPosts);
categoryrouter.get('/:id', getCategoryById);
categoryrouter.post('/', createCategory);
categoryrouter.patch('/:id', updateCategory);
categoryrouter.delete('/:id', deleteCategory);

export default categoryrouter;