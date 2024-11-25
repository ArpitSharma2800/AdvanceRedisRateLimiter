import { ExecutionContext } from "@nestjs/common";
import { RequestTracker } from "./tracker.provider";


export class RequestRateTracker implements RequestTracker {
    async getTracker(req: Record<string, any>): Promise<string> {
        const ip = getRequestIp(req);
        return `ip(${ip})`;
    }

    generateKey(req: ExecutionContext, suffix: string, name: string): string {
        const prefix = `${req.getClass().name}-${req.getHandler().name}`;
        const key = `${prefix}:${name}:${suffix}`;

        console.log(`Generated rate limit key: ${key}`);
        return key;
    }
}


export const getRequestIp = (req: Record<string, any>): string => {
    if (!req.headers['x-forwarded-for']) {
        return req.ips.length ? req.ips[0] : req.ip;
    }
    const forwardedIps = req.headers['x-forwarded-for'].split(',');
    return forwardedIps[0];
}
