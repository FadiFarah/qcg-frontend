import axios, { AxiosResponse } from "axios";

export interface IHttpHandlerService {
    get<T>(url: string): Promise<T>;
    put<T, TResult>(url: string, data: T): Promise<TResult>;
    post<T, TResult>(url: string, data?: T): Promise<TResult>;
    delete<T>(url: string): Promise<T>;

    generateHttpOptions(languageCode?: string): any;
}

class HttpHandlerService implements IHttpHandlerService {
    public get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            axios.get<T>(url)
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
            axios.put<TResult>(url, data)
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
            axios.post<TResult>(url, data)
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
            axios.delete<T>(url)
                .then((response: AxiosResponse<T>) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public generateHttpOptions(languageCode?: string) {
        throw new Error("Method not implemented.");
    }
}

export default HttpHandlerService;