import { Parent } from "../entity/parents.entity";
import { Student } from "../entity/students.entity";
import redisClient from "../utils/connectRedis";
import { signJwt } from "../utils/jwt";

export const signTokens = async (user: Parent | Student) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: process.env.REDIS_CACHE_EXPIRES_IN * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt(
    { sub: user.id },
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
    }
  );

  const refresh_token = signJwt(
    { sub: user.id },
    {
      expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}m`,
    }
  );

  return { access_token, refresh_token };
};
