import express from 'express'
import { authUser } from '../controllers/users/authController.js'
import { getAccessToken } from '../controllers/users/getAccessToken.js'
import { logoutUser } from '../controllers/users/logoutController.js'
import { getUserProfile } from '../controllers/users/profileController.js'
import { registerUser } from '../controllers/users/regController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/login/access-token').get(protect, getAccessToken)
router.route('/logout').get(logoutUser)
router.route('/profile').get(protect, getUserProfile)

export default router
