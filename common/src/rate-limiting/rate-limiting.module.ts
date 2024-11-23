import { DynamicModule, Module, Type } from '@nestjs/common';
import { RateLimitConfig } from './utils/config/rate-limit.config';
import { RedisConnection } from './utils/config/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Redis } from 'ioredis';

const throttlerStorage = (config: RedisConnection) => {
    if (config.clusterMode) {
        return new ThrottlerStorageRedisService(
            new Redis.Cluster(
                [
                    {
                        host: config.redisHost,
                        port: config.redisPort
                    }
                ],
                {
                    redisOptions: {
                        password: config.redisPassword,
                        username: config.redisUsername,
                        db: config.redisDb,
                        keyPrefix: 'rt'
                    }
                }
            )
        )
    }
    console.log('standalone redis mode')
    return new ThrottlerStorageRedisService(
        new Redis(
            {
                host: config.redisHost,
                port: config.redisPort,
                password: config.redisPassword,
                username: config.redisUsername,
                db: config.redisDb,
                keyPrefix: 'rt'
            }
        )
    )
};


@Module({})
export class RateLimitingModule {
    // static async registerAsync is a design pattern used 
    // in custom modules to allow asynchronous, dynamic 
    // configuration when the module is being imported into other parts of the application.
    static async registerAsync(
        storageConfig: Type<RedisConnection>,
        rateLimitConfig: RateLimitConfig[]
    ): Promise<DynamicModule> {
        return {
            module: RateLimitingModule,
            imports: [
                ThrottlerModule.forRootAsync({
                    imports: [
                        // ConfigModule.Register(storageConfig)
                    ],
                    inject: [storageConfig],
                    useFactory: (config: RedisConnection) => ({
                        throttlers: rateLimitConfig.map((config) => ({
                            name: config.name,
                            ttl: config.window,
                            limit: config.requests
                        })),
                        storage: throttlerStorage(config)
                    }),
                })
            ],
            providers: []
        }
    }
}

