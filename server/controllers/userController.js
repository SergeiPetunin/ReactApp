import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//all users
export const getUsers = async (req, res) => {
	try {
		const users = await Users.findAll({
			attributes: ['id', 'name', 'email', 'role'],
		});
		res.json(users);
	} catch (error) {
		console.log(error);
	}
};
//user by email
export const getUser = async (req, res) => {
	try {
		const user = await Users.findAll({
			attributes: ['id', 'name', 'email', 'role'],
			where: {
				email: req.email,
			},
		});
		res.json(user);
	} catch (error) {
		console.log(error);
	}
};
//----------------------Register default role- user
export const Register = async (req, res) => {
	const { name, email, password, confPassword } = req.body;
	if (password !== confPassword)
		return res.status(400).json({ msg: 'Password and Confirm Password do not match'
	});
	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		await Users.create({
			name: name,
			email: email,
			password: hashPassword,
		});
		res.json({ msg: 'Registration Successful' });
	} catch (error) {
		console.log(error);
	}
};

//--------------login
export const Login = async (req, res) => {
	try {
		const user = await Users.findAll({
			where: {
				email: req.body.email,
			},
		});
//----------------bcrypt password
	const match = await bcrypt.compare(req.body.password, user[0].password);
	if (!match) return res.status(400).json({ msg: 'Wrong Password' });
	const userId = user[0].id;
	const name = user[0].name;
	const email = user[0].email;

//jwt.sign создание токена-исп для аутентификации/авторизации пользователей
	const accessToken = jwt.sign({ userId, name, email },
		process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15s',
	});
	const refreshToken = jwt.sign({ userId, name, email },
		process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '1d',
	});
	await Users.update(
		{ refresh_token: refreshToken },
		{
			where: {
				id: userId,
			},
		},
	);
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});
	res.json({ accessToken });
	} catch (error) {
	res.status(404).json({ msg: 'Email not found' });
	}
	};
//--------------logout
export const Logout = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.sendStatus(204);
	const user = await Users.findAll({
		where: {
			refresh_token: refreshToken,
		},
	});
	if (!user[0]) return res.sendStatus(204);
	const userId = user[0].id;
	await Users.update(
		{ refresh_token: null },
		{
			where: {
				id: userId,
			},
		},
	);
	res.clearCookie('refreshToken');
	return res.sendStatus(200);
};