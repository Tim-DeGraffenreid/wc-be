import { parent, student } from '@prisma/client'
import redisClient from '../utils/connectRedis'
import { signJwt } from '../utils/jwt'

export const signTokens = async (user: student | parent) => {
  redisClient.set(user.id, JSON.stringify(user), {
    EX: Number(process.env.REDIS_CACHE_EXPIRES_IN) * 60,
  })

  const access_token = signJwt(
    { sub: user.id },
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}d`,
    }
  )

  return { access_token }
}
