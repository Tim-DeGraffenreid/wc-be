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
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
      SFUSERNAME: string
      SFPASSWORD: string
      SFSECURITYTOKEN: string
      SFCLIENTID: string
      SFCLIENTSECRET: string
      EMAIL_HOST: string
      EMAIL_HOST_USER: string
      EMAIL_HOST_PASSWORD: string
      EMAIL_USE_TLS: boolean
      EMAIL_PORT: number
      DEFAULT_FROM_EMAIL: string
    }
  }
}
