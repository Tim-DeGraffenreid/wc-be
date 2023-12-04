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
import classRouter from './routes/class.route'
import AppError from './utils/appError'
import redisClient, { connectRedis } from './utils/connectRedis'
import { syncDatabaseAndSalesforce } from './services/salesforce.service'

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

    // Sync salesforce data every 2hrs
    cron.schedule('0 */2 * * *', async () => {
      try {
        await syncDatabaseAndSalesforce()
      } catch (error) {
        console.error('Error during scheduled synchronization:', error)
      }
    })

    app.get('/api/healthChecker', async (req: Request, res: Response) => {
      const message = await redisClient.get('try')

      res.status(200).json({
        status: 'success',
        message,
      })
    })

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`))
    })

    app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
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
