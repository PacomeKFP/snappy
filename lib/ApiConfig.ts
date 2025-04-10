import axios, {AxiosInstance} from 'axios';
import {toast} from "sonner";

export class ApiConfig {
    private static instance: AxiosInstance;

    public static getInstance(recreate: boolean = false, baseUrl: string = "", withAuth: boolean = true, bearer?: string): AxiosInstance {
        if (!ApiConfig.instance || !!ApiConfig.instance && recreate) {
            // const token: string | null = localStorage.getItem('token');

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            if (withAuth && bearer)
                headers['Authorization'] = `Bearer ${bearer}`
            ApiConfig.instance = axios.create({
                baseURL: baseUrl, headers
            });

            this.setupInterceptors()
        }
        return ApiConfig.instance;
    }

    static setupInterceptors(): void {
        ApiConfig.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                toast.error(error.response.data.message);
                if (error.response?.status === 422) {
                    return Promise.reject(error.response.data as object);
                }
                if (error.response?.status === 403) {
                    return Promise.reject(error.response.data as object);
                }
                if (error.response?.status === 404) {
                    return Promise.reject(error.response.data as object);
                }
                return Promise.reject(error);
            }
        );
    }
}