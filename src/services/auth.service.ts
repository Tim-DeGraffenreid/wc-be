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

export const generateVerifyEmailToken = async ({
  email,
  userType,
}: {
  email: string
  userType: 'student' | 'parent'
}) => {
  redisClient.set(email, JSON.stringify({ email, userType }), {
    EX: 24 * 60 * 60,
  })
  const token = signJwt(
    { sub: email },
    {
      expiresIn: `2d`,
    }
  )

  return { token }
}
