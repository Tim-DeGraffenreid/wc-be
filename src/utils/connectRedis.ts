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
    await redisClient.connect()
    console.log('⚡[redis]: Redis client connected successfully')
    redisClient.set('try', 'Hello Welcome to Wecode')
  } catch (error) {
    console.log(error)
    setTimeout(connectRedis, 5000)
  }
}

export default redisClient
