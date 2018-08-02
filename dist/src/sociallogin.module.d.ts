import { ModuleWithProviders } from '@angular/core';
import { AuthServiceConfig } from './auth.service';
export declare function configFactory(config: AuthServiceConfig): AuthServiceConfig;
export declare class SocialLoginModule {
    static initialize(config: AuthServiceConfig): ModuleWithProviders;
}
