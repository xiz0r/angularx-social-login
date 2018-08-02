import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
import { LoginOpt } from '../auth.service';
export declare class FacebookLoginProvider extends BaseLoginProvider {
    private clientId;
    private opt;
    private locale;
    private fields;
    private version;
    static readonly PROVIDER_ID: string;
    constructor(clientId: string, opt?: LoginOpt, locale?: string, fields?: string, version?: string);
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(opt?: LoginOpt): Promise<SocialUser>;
    signOut(): Promise<any>;
}
