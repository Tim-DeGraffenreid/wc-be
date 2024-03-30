import { createClient } from 'redis'

const redisClient = createClient({
  password: 'VrMDd6Xwxu4kpNQDwYudS9TeofGdfI8D',
  socket: {
    host: 'redis-14837.c302.asia-northeast1-1.gce.cloud.redislabs.com',
    port: 14837,
  },
})

export const connectRedis = async () => {
  try {
    await new Promise<void>((resolve, reject) => {
      redisClient.on('connect', () => {
        console.log('⚡[redis]: Redis client connected successfully')
        resolve()
      })

      redisClient.on('error', (error) => {
        console.error('Error connecting to Redis:', error)
        reject(error)
      })
    })
  } catch (error) {
    console.error('Error connecting to Redis:', error)
    setTimeout(connectRedis, 5000)
  }
}

export default redisClient
