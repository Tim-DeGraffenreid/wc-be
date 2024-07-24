
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
import cronsRouter from './routes/crons.route'
const app: Express = express()
const port = process.env.PORT || 3000

connectRedis()
  .then(async () => {
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
    app.use('/api/crons', cronsRouter )
    // CronJobs
  
    app.get('/api/synchronize', async (  req: Request,
      res: Response,
      next: NextFunction) => {  
    try {
     // await syncDatabaseAndSalesforce()
      console.log("Syncronize")
      res.status(201).json({
          status: 'success',
          message:  'syncDatabaseAndSalesforce successfully executed',
        })
  
    } catch (error) {
      console.error('syncDatabaseAndSalesforce error during scheduled synchronization:', error)
      next(error)
    }})

    app.get('/api/sync', async (_req: Request, res: Response) => {
      const message = "sync visited"
      console.log("message: ", message)

      res.status(200).json({
        status: 'success',
        message,
      })
    })
    
    // Health checker: to check if server is successfully running
    app.get('/api/healthChecker', async (_req: Request, res: Response) => {
      const message = await redisClient.get('try')

      res.status(200).json({
        status: 'success',
        message,
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

export default app;


