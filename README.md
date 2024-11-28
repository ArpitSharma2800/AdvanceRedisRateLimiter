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

### Notes
- The rate limiting logic is implemented in the `@predator/common` package.
- The `@nestjs/throttler` package is used to implement the rate limiting logic in the `service-one` and `service-two` applications.
- The `@nest-lab/throttler-storage-redis` package is used to implement the Redis storage for the rate limiting logic in the `service-one` and `service-two` applications.
- The `ioredis` package is used to implement the Redis client in the `service-one` and `service-two` applications.
- The `RequestRateTracker` class is used to generate the rate limit key. It uses the request URL and the IP address to generate the key.
- The `RequestRateLimiter` class is used to implement the rate limiting logic. It uses the `RequestRateTracker` class to generate the rate limit key and the `BaseLimiter` class to implement the rate limiting logic.
- The `BaseLimiter` class is a base class for the rate limiters. It contains the common logic for the rate limiters.
- The `RequestTracker` interface is used to generate the rate limit key. It contains the `getRequestIp` method to get the IP address from the request and the `generateKey` method to generate the rate limit key.

### How to use
- Install the common package in the workspace: `pnpm add @predator/common` or `pnpm link @predator/common`
- Import `RateLimitingModule` from `@predator/common` and use the `registerAsync` method to register the module.
- The `registerAsync` method takes two arguments:
    - The first argument is the storage configuration, which is the configuration for the Redis connection.
    - The second argument is the rate limit configuration, which is an array of objects that contain the name, window, and requests for each rate limit.
- The rate limit configuration is an array of objects that contain the name, window, and requests for each rate limit.
    - The name is the name of the rate limiter.
    - The window is the time window for the rate limiter in milliseconds.
    - The requests is the number of requests allowed in the time window.
- Decorate the controller with the `@Throttle` decorator.
    - The `@Throttle` decorator takes one argument:
        - The first argument is the rate limit configuration, which is the configuration for the rate limiter.
    - The rate limit configuration is an object that contains the name and the limit for the rate limiter.
        - The name is the name of the rate limiter.
        - The limit is the number of requests allowed in the time window.

### Example
- The `service-one` application is an example of how to use the rate limiting module.
- The `service-two` application is an example of how to use the rate limiting module.

```Generated rate limit key: AppController-getHello:service-one:ip(::1)```
```ThrottlerLimitDetail: Tracker is throttled for exceeding the rate limit of 1 in 10000ms | Api Endpoint - AppController | getHello | Total Hits - 2```
