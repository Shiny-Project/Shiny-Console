import { StatisticsResponse, RecentEventsResponse } from '@/types/dashboard';

export interface StoreState {
    user: UserState;
    dashboard: DashboardState;
}
// User
export interface UserState {
    isLogin: boolean;
    userName?: string;
    loading: boolean;
}
// Dashboard
export interface DashboardState {
    errors?: ErrorState;
    overview: OverviewState;
    realtime: RealtimeState;
}
export interface ErrorState {
    lastError: Error;
    errorId: number;
}
// Dashboard/Overview
export interface OverviewState {
    isLoading: boolean;
    statistics?: StatisticsResponse;
}
// Dashboard/Realtime
export interface RealtimeState {
    isLoading: boolean;
    recentEvents?: RecentEventsResponse;
}