export interface UserState {
    isLogin: boolean;
    userName?: string;
    loading: boolean;
}
export interface DashboardState {
    error?: Error;
}
export interface StoreState {
    user: UserState;
    dashboard: DashboardState;
}