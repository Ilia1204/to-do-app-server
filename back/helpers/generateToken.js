import jwt from 'jsonwebtoken'

export const createAccessToken = id => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	})
}

export const createRefreshToken = id => {
	return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	})
}
