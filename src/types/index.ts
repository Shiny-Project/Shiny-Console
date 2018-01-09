import { StatisticsResponse } from '@/types/dashboard';

export interface UserState {
    isLogin: boolean;
    userName?: string;
    loading: boolean;
}
// Dashboard
export interface DashboardState {
    error?: Error;
    overview?: OverviewState;
}
export interface OverviewState {
    isLoading: boolean;
    statistics?: StatisticsResponse;
}
export interface StoreState {
    user: UserState;
    dashboard: DashboardState;
}