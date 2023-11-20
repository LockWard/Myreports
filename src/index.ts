import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

// Routes
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import reportRoutes from './routes/report.routes'
import departmentRoutes from './routes/department.routes'

const app = express()// The main app

// Middleware - This transform the req.body to json
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/report', reportRoutes)
app.use('/api/department', departmentRoutes)

export default app