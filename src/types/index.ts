import { StatisticsResponse, RecentEventsResponse, Job, ServerListResponse } from '@/types/dashboard';

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
    server: ServerState;
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
    recentJobs?: Job[];
}

// Dashboard/Server
export interface ServerState {
    node: ServerNodeState;
}
// Dashboard/Server/Node
export interface ServerNodeState {
    isLoading: boolean;
    serverList: ServerListResponse;
}