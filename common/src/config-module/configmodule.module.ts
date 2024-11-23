import { DynamicModule, Module, Type } from '@nestjs/common';
import { createConfiguration } from './lib/config.service';
import 'reflect-metadata';


@Module({
    providers: [],
    exports: []
})
export class ConfigModule {




    /**
   * Registers the configuration module with the specified configuration class
   * @param configurationClass The class to use for configuration
   * @param configFilePaths Paths to .env files
   * @param prefix Prefix for environment variables
   */
    static register<T>(
        configurationClass: Type<T>,
        configFilePaths: string[] = [],
        prefix?: string
    ): DynamicModule {
        const provider = {
            provide: prefix ?
                `${prefix}_${configurationClass.name}` :
                configurationClass.name,
            useFactory: () => createConfiguration(
                configurationClass,
                configFilePaths,
                prefix
            ),
            global: true
        };

        return {
            module: ConfigModule,
            providers: [provider],
            exports: [provider]
        };
    }
}

