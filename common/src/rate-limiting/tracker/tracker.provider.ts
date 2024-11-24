import { ExecutionContext } from "@nestjs/common";

export interface RequestTracker {
    getTracker(req: Record<string, any>): Promise<string>;
    generateKey(req: ExecutionContext, suffix: string, name: string): string;
}
