import { Router } from 'express'

import * as departmentControllers from '../controllers/department.controllers'
import { verifyToken, isModerator, isAdmin } from '../middlewares/authjwt'

const router: Router = Router()

router.get('/', [verifyToken, isModerator, isAdmin], departmentControllers.getAllDepartments)

router.get('/:id', [verifyToken, isModerator, isAdmin], departmentControllers.getDepartmentId)


router.post('/', [verifyToken, isAdmin], departmentControllers.postDepartment)

router.put('/:id', [verifyToken, isAdmin], departmentControllers.putDepartment)

router.delete('/:id', [verifyToken, isAdmin], departmentControllers.deleteDepartment)

export default router
