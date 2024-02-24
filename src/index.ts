import 'dotenv/config'
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import cron from 'node-cron'

import parentRouter from './routes/parents.route'
import studentRouter from './routes/students.route'
import authRouter from './routes/auth.route'
import adminRouter from './routes/admin.route'
import classRouter from './routes/class.route'
import eventsRouter from './routes/events.route'
import AppError from './utils/appError'
import redisClient, { connectRedis } from './utils/connectRedis'
import {
  deleteFromDatabase,
  handleParentToChildren,
  syncDatabaseAndSalesforce,
} from './services/salesforce.service'
import prisma from './utils/prisma'

connectRedis()
  .then(async () => {
    const app: Express = express()
    const port = process.env.PORT || 5000

    app.use(cors())
    app.use(json())
    app.use(urlencoded({ extended: false }))
    app.use(cookieparser())

    // routes
    app.use('/api/auth', authRouter)
    app.use('/api/class', classRouter)
    app.use('/api/parents', parentRouter)
    app.use('/api/students', studentRouter)
    app.use('/api/admin', adminRouter)
    app.use('/api/events', eventsRouter)

    // CronJobs
    cron.schedule('*/1 * * * *', async () => {
      try {
        await syncDatabaseAndSalesforce()
      } catch (error) {
        console.error('Error during scheduled synchronization:', error)
      }
    })

    cron.schedule('*/1 * * * *', async () => {
      try {
        await handleParentToChildren()
      } catch (error) {
        console.error('Error during scheduled relationship update:', error)
      }
    })

    cron.schedule('*/2 * * * *', async () => {
      try {
        await deleteFromDatabase()
      } catch (error) {
        console.error('Error during schedule database deletion:', error)
      }
    })

    // Health checker: to check if server is successfully running
    app.get('/api/healthChecker', async (_req: Request, res: Response) => {
      const message = await redisClient.get('try')

      res.status(200).json({
        status: 'success',
        message,
      })
    })

    app.get('/api/knowledge', async (_req: Request, res: Response) => {
      const knowledges = await prisma.student_knowledge.findMany()

      res.status(200).json({
        status: 'success',
        knowledges,
      })
    })

    // Route not found handler
    app.all('*', (req: Request, _res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`))
    })

    // Error handler across app
    app.use((error: AppError, _req: Request, res: Response, _next: NextFunction) => {
      error.status = error.status || 'error'
      error.statusCode = error.statusCode || 500

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      })
    })

    app.listen(port, () => {
      console.log(`⚡[server]: Server started successfully on PORT: ${port}`)
    })
  })
  .catch((err: any) => console.log(err))
