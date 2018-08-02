import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export declare class LinkedInLoginProvider extends BaseLoginProvider {
    private clientId;
    private authorize;
    private lang;
    private fields;
    static readonly PROVIDER_ID: string;
    constructor(clientId: string, authorize?: boolean, lang?: string, fields?: string);
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
