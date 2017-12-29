export default class Auth {
    /**
     * 是否已经登录
     */
    static isLogin(): boolean {
        return localStorage.getItem('uid') !== null;
    }
    /**
     * 登录
     * @param uid UID
     */
    static login(uid: number): void {
        localStorage.setItem('uid', uid.toString());
    }
    /**
     * 登出
     */
    static logout(): void {
        localStorage.removeItem('uid');
    }
}