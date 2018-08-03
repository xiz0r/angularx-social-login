import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
import { LoginOpt } from '../auth.service';

declare let gapi: any;

export class GoogleLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID: string = 'GOOGLE';

  protected auth2: any;

  constructor(private clientId: string, private opt: LoginOpt = {scope: 'email'}) { super(); }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loadScript(GoogleLoginProvider.PROVIDER_ID,
        '//apis.google.com/js/platform.js',
        () => {
          gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              ...this.opt,
              client_id: this.clientId
            });

            this.auth2.then(() => {
              this._readyState.next(true);
              resolve();
            }).catch((err: any) => {
              reject(err);
            });
          });
        });
    });
  }

  getLoginStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.onReady().then(() => {
        if (this.auth2.isSignedIn.get()) {
          let user: SocialUser = new SocialUser();
          let profile = this.auth2.currentUser.get().getBasicProfile();
          let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
          let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;

          user.id = profile.getId();
          user.name = profile.getName();
          user.email = profile.getEmail();
          user.photoUrl = profile.getImageUrl();
          user.firstName = profile.getGivenName();
          user.lastName = profile.getFamilyName();
          user.authToken = token;
          user.idToken = backendToken;
          resolve(user);
        } else {
          resolve(null); // if user is signout resolve with null
        }
      });
    });
  }

  signIn(opt?: LoginOpt): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.onReady().then(() => {
        let promise = this.auth2.signIn(opt);

        promise.then(() => {
          let user: SocialUser = new SocialUser();
          let profile = this.auth2.currentUser.get().getBasicProfile();
          let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
          let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;

          user.id = profile.getId();
          user.name = profile.getName();
          user.email = profile.getEmail();
          user.photoUrl = profile.getImageUrl();
          user.firstName = profile.getGivenName();
          user.lastName = profile.getFamilyName();
          user.authToken = token;
          user.idToken = backendToken;
          resolve(user);
        }, (closed: any) => {
            reject('User cancelled login or did not fully authorize.');
        }).catch((err: any) => {
          reject(err);
        });
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onReady().then(() => {
        this.auth2.signOut().then((err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }).catch((err: any) => {
          reject(err);
        });
      });
    });
  }

  revokeAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onReady().then(() => {
        this.auth2.disconnect().then((err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }).catch((err: any) => {
          reject(err);
        });
      });
    });
  }

}
