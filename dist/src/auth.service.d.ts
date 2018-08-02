import { Observable } from 'rxjs';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/user';
export interface AuthServiceConfigItem {
    id: string;
    provider: LoginProvider;
}
export interface LoginOpt {
    /**
     * Facebook FB.login options: https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11.
     */
    auth_type?: string;
    scope?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
    profile_selector_ids?: string;
    /**
     * Google gapi.auth2.ClientConfig: \
     * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig.
     */
    client_id?: string;
    cookie_policy?: string;
    fetch_basic_profile?: boolean;
    hosted_domain?: string;
    openid_realm?: string;
    ux_mode?: string;
    redirect_uri?: string;
    prompt?: string;
}
export declare class AuthServiceConfig {
    providers: Map<string, LoginProvider>;
    constructor(providers: AuthServiceConfigItem[]);
}
export declare class AuthService {
    private static readonly ERR_LOGIN_PROVIDER_NOT_FOUND;
    private static readonly ERR_NOT_LOGGED_IN;
    private providers;
    private _user;
    private _authState;
    private _readyState;
    readonly authState: Observable<SocialUser>;
    /** Provides an array of provider ID's as they become ready */
    readonly readyState: Observable<string[]>;
    constructor(config: AuthServiceConfig);
    signIn(providerId: string, opt?: LoginOpt): Promise<SocialUser>;
    signOut(): Promise<any>;
}
