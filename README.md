### Redis Rate Limiter

Redis Rate Limiter is a module that allows you to rate limit requests to your NestJS application using Redis.

Custom package:
- @predator/common : to install common package in the workspace run `pnpm add @predator/common` or `pnpm link @predator/common`
    - It has the rate limiting logic and the config module
    - To use the rate limiting module, import `RateLimitingModule` from `@predator/common` and use the `registerAsync` method to register the module.
    - The `registerAsync` method takes two arguments:
        - The first argument is the storage configuration, which is the configuration for the Redis connection.
        - The second argument is the rate limit configuration, which is an array of objects that contain the name, window, and requests for each rate limit.
- In @predator/common, another module is created "config-module" which is used to load the configuration from the .env file.
    - To use the config module, import `ConfigModule` from `@predator/common` and use the `register` method to register the module.
    - The `register` method takes one argument:
        - The first argument is the configuration class, which is the class that contains the configuration for the Redis connection.

Package used:
- @nest-lab/throttler-storage-redis
- ioredis
- @nestjs/throttler
- pnpm

