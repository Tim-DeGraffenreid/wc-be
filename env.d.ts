export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      ACCESS_TOKEN_EXPIRES_IN: number;
      REFRESH_TOKEN_EXPIRES_IN: number;
      REDIS_CACHE_EXPIRES_IN: number;
      JWT_TOKEN: string;
    }
  }
}
