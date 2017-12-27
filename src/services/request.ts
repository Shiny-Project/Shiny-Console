import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const isAxiosResponse = (e: AxiosError | AxiosResponse): e is AxiosResponse => {
    return !!((<AxiosResponse> e).status);
};

export interface RequestError {
    name: string;
    message: string;
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
    request(method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', path: string = '/', payload: object = {}) {
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
                    resolve(response.data);
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
    get(path: string = '/', payload: object = {}): Promise<object> {
        return this.request('GET', path, payload);
    }
    /**
     * HTTP POST
     * @param path 
     * @param payload 
     */
    post(path: string = '/', payload: object = {}): Promise<object> {
        return this.request('POST', path, payload);
    }
    parseError(e: AxiosError | AxiosResponse): RequestError {
        if (isAxiosResponse(e)) {
            return {
                name: e.data.name,
                message: e.data.message,
            };
        } else {
            if (e.request.response) {
                try {
                    const error = JSON.parse(e.request.responseText);
                    return {
                        name: error.error.code,
                        message: error.error.info,
                    };
                } catch (e) {
                    return {
                        name: 'unknown_error',
                        message: '未知错误',
                    };
                }
            }
            return {
                name: 'unknown_error',
                message: '未知错误',
            };
        }
    }
}

export default new Fetch();