import db from '../config/database.js'
import { DataTypes, Model } from 'sequelize'
import Category from './category.js'

class Post extends Model {}
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING },
        categoryId: { type: DataTypes.INTEGER },
    },
    {
        sequelize: db,
        tableName: 'posts',
        freezeTableName: true,
        modelName: 'Post',
        timestamp: true,
    },
)
// определим связи между таьлицами
Post.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Post, { as: 'posts', foreignKey: 'categoryId' })

export default Post