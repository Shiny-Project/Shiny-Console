import axios, { AxiosInstance } from 'axios';
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
                resolve(response.data);
            } catch (e) {
                reject(Response.error);
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
}

export default new Fetch();