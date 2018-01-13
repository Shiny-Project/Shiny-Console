import { StatisticsResponse } from '@/types/dashboard';

export interface UserState {
    isLogin: boolean;
    userName?: string;
    loading: boolean;
}
// Dashboard
export interface DashboardState {
    errors?: ErrorState;
    overview: OverviewState;
}
export interface ErrorState {
    lastError: Error;
}
export interface OverviewState {
    isLoading: boolean;
    statistics?: StatisticsResponse;
}
export interface StoreState {
    user: UserState;
    dashboard: DashboardState;
}