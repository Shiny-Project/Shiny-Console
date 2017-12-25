export interface UserState {
    isLogin: boolean;
    userName?: string;
}
export interface StoreState {
    user: UserState;
}