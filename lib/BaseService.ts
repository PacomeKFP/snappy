import {AxiosInstance} from 'axios';
import {ApiConfig} from "./ApiConfig";

export abstract class BaseService {
    protected api: AxiosInstance;

    constructor(baseUrl: string) {
        this.api = ApiConfig.getInstance(false, baseUrl);
    }

    protected refreshApiInstance(baseUrl: string, withAuth: boolean = true, bearer?: string) {
        this.api = ApiConfig.getInstance(true, baseUrl, withAuth, bearer);
    }


    protected async get<T>(path: string = ''): Promise<T> {
        const response = await this.api.get<T>(`/${path}`);
        return Promise.resolve(response.data);
    }

    protected async post<T, R>(data: T, path: string = '', headers?: Record<string, string>): Promise<R> {
        if (headers) {
            const response = await this.api.post<R>(`${path}`, data, {
                headers
            });
            return Promise.resolve(response.data);
        }

        const response = await this.api.post<R>(`${path}`, data);
        return Promise.resolve(response.data);

    }

    protected async put<T, R>(path: string = '', data: T): Promise<R> {
        const response = await this.api.put<R>(`${path}`, data);
        return Promise.resolve(response.data);
    }

    protected async patch<T, R>(path: string, data: T): Promise<R> {
        const response = await this.api.patch<R>(`${path}`, data);
        return Promise.resolve(response.data);
    }

    protected async delete(path: string): Promise<void> {
        await this.api.delete(`${path}`);
        return Promise.resolve();
    }
}