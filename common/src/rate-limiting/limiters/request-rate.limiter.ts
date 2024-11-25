import { Inject, Injectable } from '@nestjs/common';
import { InjectThrottlerOptions, InjectThrottlerStorage, ThrottlerModuleOptions, ThrottlerStorage } from "@nestjs/throttler";
import { BaseLimiter } from "./base-limiter";
import { Reflector } from '@nestjs/core';
import { RequestRateTracker } from "../tracker/limit.tracker";

@Injectable()
export class RequestRateLimiter extends BaseLimiter {
    constructor(
        @InjectThrottlerOptions()
        protected readonly options: ThrottlerModuleOptions,
        @InjectThrottlerStorage()
        protected readonly storageService: ThrottlerStorage,
        @Inject(Reflector)
        protected readonly reflector: Reflector,
    ) {
        super(options, storageService, reflector, new RequestRateTracker());
    }
}
