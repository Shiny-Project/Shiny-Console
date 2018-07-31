import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import auth from '@/services/auth';

const isAxiosResponse = (e: AxiosError | AxiosResponse): e is AxiosResponse => {
    return !!((e as AxiosResponse).status);
};

export interface Response {
    [key: string]: Response | string | number | Response[];
}

export class RequestError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }
}

class Fetch {
    private base: string = '/API';
    private instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: this.base,
            timeout: 10000,
        });
    }
    /**
     * HTTP Request
     * @param method 
     * @param path 
     * @param payload 
     */
    // tslint:disable-next-line:max-line-length
    request<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', path: string = '/', payload: object = {}): Promise<T> {
        console.log(`[${new Date().toISOString()}] ${method} ${path}`);
        let options = {
            method: method,
            url: path,
            params: {},
            data: {},
        };
        if (method === 'GET') {
            options.params = payload;
        }
        if (method === 'POST') {
            options.data = payload;
        }
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request(options);
                if (response.status === 200) {
                    resolve(response.data.data as T);
                } else {
                    reject(this.parseError(response));
                }
            } catch (e) {
                reject(this.parseError(e));
            }
        });
    }
    /**
     * HTTP GET
     * @param path 
     * @param payload 
     */
    get<T>(path: string = '/', payload: object = {}) {
        return this.request<T>('GET', path, payload);
    }
    /**
     * HTTP POST
     * @param path 
     * @param payload 
     */
    post<T>(path: string = '/', payload: object = {}) {
        return this.request<T>('POST', path, payload);
    }
    parseError(e: AxiosError | AxiosResponse): RequestError {
        if (isAxiosResponse(e)) {
            if (e.data.name === 'need_login') {
                // 登录失效
                auth.logout();
            }
            return new RequestError(e.data.name, e.data.message);
        } else {
            if (e.request.response) {
                try {
                    const error = JSON.parse(e.request.responseText);
                    return new RequestError(error.error.code, error.error.info);
                } catch (e) {
                    // Fail to parse response, do nothing
                }
            }
            if (e.request.status) {
                return new RequestError('netword_error', `网络错误: ${e.request.status} ${e.request.statusText}`);
            }
            return new RequestError('unknown_error', '未知错误');
        }
    }
}

export default new Fetch();