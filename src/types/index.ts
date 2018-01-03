export interface UserState {
    isLogin: boolean;
    userName?: string;
    loading: boolean;
}
export interface DashboardState {

}
export interface StoreState {
    user: UserState;
    dashboard: DashboardState;
}