import { createClient } from 'redis'

const redisUrl = 'redis://localhost:6379'

const redisClient = createClient({
  url: redisUrl,
})

export const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log('⚡[redis]: Redis client connected successfully')
    redisClient.set('try', 'Hello Welcome to Wecode')
  } catch (error) {
    console.log(error)
    setTimeout(connectRedis, 5000)
  }
}

export default redisClient
