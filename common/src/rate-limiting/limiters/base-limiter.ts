import { ThrottlerGuard, ThrottlerLimitDetail, ThrottlerModuleOptions, ThrottlerStorage } from "@nestjs/throttler";
import { Reflector } from "@nestjs/core";
import { getRequestIp, RequestRateTracker } from "../tracker/limit.tracker";
import { ExecutionContext } from "@nestjs/common";

export abstract class BaseLimiter extends ThrottlerGuard {
    private readonly excludedRoutes: string[] = [];

    private readonly excludedIp: string[] = [];

    protected constructor(
        protected readonly options: ThrottlerModuleOptions,
        protected readonly storageService: ThrottlerStorage,
        protected readonly reflector: Reflector,
        protected readonly tracker: RequestRateTracker,
    ) {
        super(options, storageService, reflector);
        console.log("BaseLimiter constructor");
        const ENV = process.env.ENV || 'development';
        // this.excludedRoutes = ["127.0.0.1"];
    }

    protected async shouldSkip(_context: ExecutionContext): Promise<boolean> {
        const { req } = this.getRequestResponse(_context);
        const route = req.url;
        let skip = false;
        this.excludedRoutes.forEach((route) => {
            if (route.includes(route)) {
                skip = true;
            }
        });
        if (skip) return skip;

        const ip = getRequestIp(req);
        let skipIp = false;

        this.excludedIp.forEach((excludedIp) => {
            if (ip.includes(excludedIp)) {
                skipIp = true;
            }
        });

        if (skipIp) return skipIp;

        return false;
    }

    protected async throwThrottlingException(context: ExecutionContext, throttlerLimitDetails: ThrottlerLimitDetail): Promise<void> {
        console.log(`ThrottlerLimitDetail: Tracker is throttled for exceeding the rate limit of ${throttlerLimitDetails.limit} in ${throttlerLimitDetails.ttl}ms | Api Endpoint - ${context.getClass().name} | ${context.getHandler().name} | Total Hits - ${throttlerLimitDetails.totalHits}`);
        return super.throwThrottlingException(context, throttlerLimitDetails);
    }

    protected getTracker(req: Record<string, any>): Promise<string> {
        console.log("getTracker");
        return this.tracker.getTracker(req);
    }

    protected generateKey(context: ExecutionContext, suffix: string, name: string): string {
        console.log("generateKey");
        return this.tracker.generateKey(context, suffix, name);
    }
}

