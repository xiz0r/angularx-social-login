import { LoginProvider } from './login-provider';
import { SocialUser } from './user';
import { BehaviorSubject } from 'rxjs';
export declare abstract class BaseLoginProvider implements LoginProvider {
    protected _readyState: BehaviorSubject<boolean>;
    constructor();
    protected onReady(): Promise<void>;
    abstract initialize(): Promise<void>;
    abstract getLoginStatus(): Promise<SocialUser>;
    abstract signIn(): Promise<SocialUser>;
    abstract signOut(): Promise<any>;
    loadScript(id: string, src: string, onload: any, async?: boolean, inner_text_content?: string): void;
}
