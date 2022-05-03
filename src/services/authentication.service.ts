import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

export interface authenticationInfo {
    userDetails: user | null;
    authenticationToken: string | null;
}

export interface user {
    email: string;
    emailVerified: boolean;
    lastName: string;
    firstName: string;
    locale: string;
    displayName: string;
    picture: string;
    sub: string;
    score: number;
}

export interface IAuthenticationService {
    authenticationInfo: authenticationInfo;

    get<T>(url: string): Promise<T>;
    put<T, TResult>(url: string, data: T): Promise<TResult>;
    post<T, TResult>(url: string, data?: T): Promise<TResult>;
    delete<T>(url: string): Promise<T>;

}

class AuthenticationService implements IAuthenticationService {

    private _authenticationInfo: authenticationInfo;

    constructor() {
        this._authenticationInfo = null;
    }

    public get authenticationInfo(): authenticationInfo {
        return this._authenticationInfo;
    }
    
    public get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            axios.get<T>(url, { headers: this.addAuthenticationToken() })
                .then((response: AxiosResponse<T>) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public put<T, TResult>(url: string, data: T): Promise<TResult> {
        return new Promise<TResult>((resolve, reject) => {
            axios.put<TResult>(url, data, { headers: this.addAuthenticationToken() })
                .then((response: AxiosResponse<TResult>) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public post<T, TResult>(url: string, data?: T): Promise<TResult> {
        return new Promise<TResult>((resolve, reject) => {
            axios.post<TResult>(url, data, { headers:this.addAuthenticationToken() })
                .then((response: AxiosResponse<TResult>) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public delete<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            axios.delete<T>(url, { headers:this.addAuthenticationToken() })
                .then((response: AxiosResponse<T>) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public storeAuthenticationInfo(tokenClaims: any, accessToken: any): void {
        this._authenticationInfo = {
            userDetails: {
                email: tokenClaims.email,
                emailVerified: tokenClaims.email_verified,
                firstName: tokenClaims.given_name,
                lastName: tokenClaims.family_name,
                displayName: tokenClaims.name,
                locale: tokenClaims.locale,
                picture: tokenClaims.picture,
                sub: tokenClaims.sub,
                score: 0
            },
            authenticationToken: accessToken
        };
        
        localStorage.setItem("auth", accessToken);
        localStorage.setItem("user", JSON.stringify(this.authenticationInfo.userDetails));
    }

    public updateUserDetails(updatedUser: user): void {
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    public storeUserId(id: string): void {
        localStorage.setItem("userId", id);
    }

    public getUserId(): string {
        return localStorage.getItem("userId");
    }

    public getAuthenticationInfo(): authenticationInfo {
        let authenticationInfo: authenticationInfo = null;
        if(localStorage.getItem("auth") && localStorage.getItem("user")) {
            authenticationInfo = {
                authenticationToken: localStorage.getItem("auth"),
                userDetails: JSON.parse(localStorage.getItem("user"))
            }
        }
        return authenticationInfo;
    }

    private addAuthenticationToken(): AxiosRequestHeaders {
        const headers: AxiosRequestHeaders = {
            "Authorization": `Bearer ${localStorage.getItem("auth")}`
        }
        return headers;
    }
}

export default AuthenticationService;