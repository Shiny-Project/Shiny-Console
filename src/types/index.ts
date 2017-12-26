export interface UserState {
    isLogin: boolean;
    userName?: string;
    loading: boolean;
}
export interface StoreState {
    user: UserState;
}