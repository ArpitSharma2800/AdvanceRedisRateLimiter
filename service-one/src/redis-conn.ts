import { RedisConnection } from "@predator/common";

export class RedisConn implements RedisConnection {
    readonly redisHost: string = process.env.REDIS_HOST || 'localhost';
    readonly redisPort: number = parseInt(process.env.REDIS_PORT || '6379', 10);
    readonly redisUsername: string = process.env.REDIS_USERNAME || '';
    readonly redisPassword: string = process.env.REDIS_PASSWORD || '';
    readonly redisDb: number = parseInt(process.env.REDIS_DB || '0', 10);
    readonly clusterMode: boolean = process.env.REDIS_CLUSTER_MODE === 'true';
}