import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../helpers/generateToken.js'
import User from '../../models/userModel.js'

// @desc    Get Access Token
// @route   GET /api/users/login/access-token
// @access  Private
export const getAccessToken = asyncHandler(async (req, res) => {
	try {
		const rfToken = req.cookies.token
		if (!rfToken) {
			res.status(400)
			throw new Error('Пожалуйста, войдите в систему!')
		}

		const result = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET)
		if (!result) {
			res.status(400)
			throw new Error('Неверный токен или закончился.')
		}

		const user = await User.findById(result.id)
		if (!user) {
			res.status(400)
			throw new Error('Пользователь не найден.')
		}

		const accessToken = createAccessToken(user._id)

		res.json({
			userInfo: {
				_id: user._id,
				email: user.email,
				name: user.name,
			},
			accessToken,
		})
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})
