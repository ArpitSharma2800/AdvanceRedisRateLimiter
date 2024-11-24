import { Type } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { validate } from 'class-validator';

/**
   * Creates a configuration instance by merging environment variables, .env files, and defaults
   */
export async function createConfiguration<T>(
    configClass: Type<T>,
    configFilePaths: string[],
    prefix?: string
): Promise<T> {
    // Load all .env files
    const envFiles = configFilePaths.map(filePath => {
        try {
            return dotenv.parse(require('fs').readFileSync(path.resolve(filePath)));
        } catch (error) {
            console.warn(`Warning: Could not load config file ${filePath}`);
            return {};
        }
    });

    // Merge all env files with process.env, giving precedence to process.env
    const mergedEnv = {
        ...envFiles.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        ...process.env
    };

    // Create instance of config class
    const instance = new configClass();
    const prototype = Object.getPrototypeOf(instance);
    const propertyKeys = Object.getOwnPropertyNames(prototype);

    // Get all properties from the class
    for (const key of propertyKeys) {
        if (key === 'constructor') continue;

        const envKey = prefix ? `${prefix}_${key.toUpperCase()}` : key.toUpperCase();
        const defaultValue = instance[key];

        // Set value from env or use default
        if (envKey in mergedEnv) {
            const value = mergedEnv[envKey];
            instance[key] = this.convertValue(value, typeof defaultValue);
        }
    }
    return instance;
}


/**
   * Converts string values from env to the correct type
   */
export function convertValue(value: string, type: string): any {
    switch (type) {
        case 'number':
            return Number(value);
        case 'boolean':
            return value.toLowerCase() === 'true';
        case 'object':
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        default:
            return value;
    }
}