import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
	const refreshToken = req.cookies.token

	if (refreshToken) {
		try {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Не авторизован, токен не работает')
		}
	}
	if (!refreshToken) {
		res.status(401)
		throw new Error('Не авторизован, без токена')
	}
})

export { protect }
