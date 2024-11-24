import { Injectable } from '@nestjs/common';
import { RedisConnection } from '@predator/common';

@Injectable()
export class RedisConn implements RedisConnection {
    redisHost: string = 'localhost';  // or from env
    redisPort: number = 6379;         // or from env
    redisPassword: string = '';       // or from env
    redisUsername: string = '';       // or from env
    redisDb: number = 0;             // or from env
    clusterMode: boolean = false;     // or from env
}