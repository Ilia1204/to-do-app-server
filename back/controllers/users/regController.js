import asyncHandler from 'express-async-handler'
import {
	createAccessToken,
	createRefreshToken,
} from '../../helpers/generateToken.js'
import { createLoginCookie } from './authController.js'
import User from '../../models/userModel.js'

// @desc    Create new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('Такой пользователь уже существует')
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	const accessToken = createAccessToken(user._id)
	const refreshToken = createRefreshToken(user._id)

	createLoginCookie(res, refreshToken)

	res.status(201).json({
		userInfo: {
			_id: user._id,
			name: user.name,
			email: user.email,
		},
		accessToken,
	})
})
