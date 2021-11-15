import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'

//@desc 	Get user profile
//@route 	GET /api/users/profile
//@access Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')

	if (!user) {
		res.status(404)
		throw new Error('Данный пользователь не найден!')
	}

	res.json(user)
})
