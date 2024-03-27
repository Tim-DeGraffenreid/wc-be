import redis from 'redis'

const redisUrl = 'redis://localhost:6379'

const redisClient = redis.createClient({
  url: redisUrl,
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
