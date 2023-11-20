import { Router } from 'express'

import * as reportControllers from '../controllers/report.controllers'
import { verifyToken, isModerator, isAdmin } from '../middlewares/authjwt'

const router: Router = Router()
// Only accesible by admin or moderator
router.get('/admin', [verifyToken, isModerator], reportControllers.getAllReports)

router.get('/active/admin', [verifyToken, isModerator], reportControllers.getAllReportsActives)

router.get('/completed/admin', [verifyToken, isModerator], reportControllers.getAllReportsCompleted)

router.put('/:id/toggle', [verifyToken, isModerator], reportControllers.putReportToggleByAdmin)

router.delete('/:id/admin', [verifyToken, isAdmin], reportControllers.deleteReport)


// View by normal user logged
router.get('/:id', [verifyToken], reportControllers.getReportId)

router.get('/all', [verifyToken], reportControllers.getAllReportsByUser)

router.get('/active', [verifyToken], reportControllers.getAllReportsActivesByUser)

router.get('/completed', [verifyToken], reportControllers.getAllReportsCompletedByUser)

router.post('/', [verifyToken], reportControllers.postReport)

router.put('/:id', [verifyToken], reportControllers.putReport)

export default router
