import { Router } from 'express'

import * as authControllers from '../controllers/auth.controllers'
import { verifyToken } from '../middlewares/authjwt'

const router: Router = Router()

router.post('/signup', authControllers.signUp) // register

router.post('/signin', authControllers.signIn) // login

router.post('/signout', [verifyToken], authControllers.signOut) // logout

export default router
