// tslint:disable-next-line:max-line-length
import { StatisticsResponse, RecentEventsResponse, Job, ServerListResponse, APIKeyPairsResponse, APIKeyPair, ServerNode, SpiderListResponse, Spider } from '@/types/dashboard';

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
    spider: SpiderState;
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
    application: ApplicationState;
}
// Dashboard/Server/Node
export interface ServerNodeState {
    isLoading: boolean;
    modalVisible: boolean;
    modalLoading: boolean;
    serverList: ServerListResponse;
}
// Dashboard/Server/Application
export interface ApplicationState {
    isLoading: boolean;
    createModalVisible: boolean;
    createModalLoading: boolean;
    keyPairs: APIKeyPair[];
    serverList: ServerNode[];
}
// Dashboard/Spider
export interface SpiderState {
    list: SpiderListState;
}
// Dashboard/Spider/list
export interface SpiderListState {
    spiderList: SpiderListResponse;
    isLoading: boolean;
    comfirmLoading: boolean;
    frequencyUpdateModalVisible: boolean;
    frequencyUpdateLoading: boolean;
    nowEditingSpider: Spider;
}