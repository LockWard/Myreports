import { Router } from 'express'
import * as reportControllers from '../controllers/report.controllers'
import { verifyToken, isModerator, isAdmin } from '../middlewares/authjwt'

const router: Router = Router()
// Only accesible by admin or moderator
router.get('/', reportControllers.getAllReports)

router.get('/active', reportControllers.getAllReportsActives)

router.get('/completed', reportControllers.getAllReportsCompleted)


router.get('/:id', reportControllers.getReportId)

router.post('/', [verifyToken, isModerator], reportControllers.postReport)

router.put('/:id', reportControllers.putReport)

router.delete('/:id', [verifyToken, isAdmin], reportControllers.deleteReport)


// View by normal user logged
router.get('/all', reportControllers.getAllReportsByUser)

/* router.get('/active/', reportControllers.getAllReportsActivesByUser)

router.get('/completed/', reportControllers.getAllReportsCompletedByUser) */

export default router
