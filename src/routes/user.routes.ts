import { Router } from 'express'

import * as userControllers from '../controllers/user.controllers'
import { verifyToken, isModerator, isAdmin } from '../middlewares/authjwt'

const router: Router = Router()

router.get('/', [verifyToken, isModerator, isAdmin], userControllers.getAllUsers)

// router.post('/', userControllers.postUser)

router.get('/:id', [verifyToken], userControllers.getUserId)// Profile

router.put('/:id', [verifyToken], userControllers.putUser)

router.delete('/:id', [verifyToken, isAdmin], userControllers.deleteUser)

/* router.route('/')
    .get(userControllers.getUsers)
    .post(userControllers.postUser);

router.route('/:postId')
    .get(userControllers.getUserId)
    .delete(userControllers.deleteUser)
    .put(userControllers.putUser); */

export default router
