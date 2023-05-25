import { Sequelize } from 'sequelize'

const db = new Sequelize('post_react','root','', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db
