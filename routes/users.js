import express from 'express'
import { login, signup, forgotPassword } from '../controllers/auth.js'
import { getAllUsers, updateProfile, updateFollow, updateUnFollow } from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signup',signup)
router.post("/login", login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)
router.post('/forgotPassword', forgotPassword)
router.patch('/updatefollow/:id', updateFollow)
router.patch('/updateunfollow/:id',updateUnFollow)

export default router
