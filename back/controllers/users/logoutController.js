import asyncHandler from 'express-async-handler'

// @desc    Logout user & remove token
// @route   GET /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
	res
		.cookie('token', '', {
			httpOnly: true,
			path: '/api',
			expires: new Date(0),
		})
		.send()
})
