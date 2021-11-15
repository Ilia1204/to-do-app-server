import asyncHandler from 'express-async-handler'
import {
	createAccessToken,
	createRefreshToken,
} from '../../helpers/generateToken.js'
import User from '../../models/userModel.js'
import { PRODUCTION } from '../../config/constants.js'
import { getEnv } from '../../config/env.js'

export const createLoginCookie = (res, refreshToken) => {
	res.cookie('token', refreshToken, {
		httpOnly: true,
		secure: getEnv('NODE_ENV') === PRODUCTION ? true : false,
		path: '/api',
		expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
	})
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const accessToken = createAccessToken(user._id)
		const refreshToken = createRefreshToken(user._id)

		createLoginCookie(res, refreshToken)

		res.json({
			userInfo: {
				_id: user._id,
				email: user.email,
				name: user.name,
			},
			accessToken,
		})
	} else {
		res.status(401)
		throw new Error('Неправильный email или пароль')
	}
})
