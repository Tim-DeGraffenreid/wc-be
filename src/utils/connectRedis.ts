import { createClient, RedisClientType } from 'redis';
/*/
const redisClient: RedisClientType = createClient({
  password: 'VrMDd6Xwxu4kpNQDwYudS9TeofGdfI8D',
  socket: {
    host: 'redis-14837.c302.asia-northeast1-1.gce.cloud.redislabs.com',
    port: 14837,
  },
});
*/ 

const redisClient: RedisClientType = createClient({
  password: 'pFi638ApU6pFWRfvyJvxMj1hRG9cvJln',
  socket: {
      host: 'redis-19345.c246.us-east-1-4.ec2.redns.redis-cloud.com',
      port: 19345
  },
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log('⚡[redis]: Redis client connected successfully');
      await redisClient.set('try', 'Hello Welcome to Wecode');
    } catch (error) {
      console.error('⚡[redis]: Redis connection error', error);
      setTimeout(connectRedis, 5000);
    }
  }
};

export default redisClient;

