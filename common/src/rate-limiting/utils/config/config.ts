export interface RedisConnection {
    redisHost: string;
    redisPort: number;
    redisUsername: string;
    redisPassword: string;
    redisDb: number;
    clusterMode: boolean;
}
