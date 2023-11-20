import { Router } from 'express'

import * as userControllers from '../controllers/user.controllers'
import { verifyToken, isModerator, isAdmin } from '../middlewares/authjwt'

const router: Router = Router()

router.get('/', [verifyToken, isModerator, isAdmin], userControllers.getAllUsers)

router.get('/:id', [verifyToken], userControllers.getUserId)


router.post('/', [verifyToken, isModerator, isAdmin], userControllers.postUserByAdmin)

router.put('/:id', [verifyToken, isModerator, isAdmin], userControllers.putUserByAdmin)

router.delete('/:id', [verifyToken, isModerator, isAdmin], userControllers.deleteUser)

/* router.route('/')
    .get(userControllers.getUsers)
    .post(userControllers.postUser);

router.route('/:postId')
    .get(userControllers.getUserId)
    .delete(userControllers.deleteUser)
    .put(userControllers.putUser); */

export default router
