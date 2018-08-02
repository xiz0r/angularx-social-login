import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
import { LoginOpt } from '../auth.service';
export declare class GoogleLoginProvider extends BaseLoginProvider {
    private clientId;
    private opt;
    static readonly PROVIDER_ID: string;
    protected auth2: any;
    constructor(clientId: string, opt?: LoginOpt);
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(opt?: LoginOpt): Promise<SocialUser>;
    signOut(): Promise<any>;
    revokeAuth(): Promise<any>;
}
