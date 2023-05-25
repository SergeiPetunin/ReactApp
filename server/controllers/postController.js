import Post from '../models/post.js'

//получиь список всез постов и категорию
export const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.findAll({
            include: 'category',
            where: {},
            order: [['createdAt','DESC']],
        })
        res.json(posts)
    }catch (error) {
        res.json({ message: error.message })
    }
};
//получить одну запись post по id + category.name
export const getPostById = async(req,res) => {
    try {
        const post = await Post.findAll({
            include: 'category',
            where: {
                id: req.params.id,
            },
        });
        res.json(post[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};
//получить list post по categoryId + category.name
export const getPostByIdCategory = async(req,res) => {
    try {
        const posts = await Post.findAll({
            include: 'category',
            where: {
                categoryId: req.params.id,
            },
            order: [['createdAt', 'DESC']],
        });
    } catch (error) {
        res.json({ message: error.message});
    }
};

// CRUD

//create post
export const createPost = async (req, res) => {
    try {
        await Post.create(req.body);
        res.json({
            message: 'Post Created',
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//update post
export const updatePost = async (req, res) => {
    try {
        await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        res.json({
            message: 'Post Updated',
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//delete post
export const deletePost = async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.json({
            message: 'Post Deleted',
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}