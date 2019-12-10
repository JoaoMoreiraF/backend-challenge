import express from 'express'
import * as userController from '../controllers/userController'

const router = express.Router()

router.route('/user')
    .post(userController.addUser)

router.route('/auth/sign_in/')
    .post(userController.login)

router.route('/profile')
    .get(userController.profile)


export default router