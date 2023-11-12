export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      NODE_ENV: string
      DATABASE_URL: string
      ACCESS_TOKEN_EXPIRES_IN: number
      REDIS_CACHE_EXPIRES_IN: number
      JWT_TOKEN: string
      SFUSERNAME: string
      SFPASSWORD: string
      SFSECURITYTOKEN: string
      SFCLIENTID: string
      SFCLIENTSECRET: string
    }
  }
}
