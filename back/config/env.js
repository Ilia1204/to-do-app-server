import dotenv from 'dotenv'

export const getEnv = (key = '') => {
	const vars = dotenv.config()
	const proccessEnv = {}
	for (const key in vars) proccessEnv[key] = vars[key]
	return key ? proccessEnv.parsed[key] : proccessEnv.parsed
}
