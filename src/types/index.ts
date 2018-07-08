// tslint:disable-next-line:max-line-length
import { StatisticsResponse, RecentEventsResponse, Job, ServerListResponse, APIKeyPairsResponse, APIKeyPair, ServerNode, SpiderListResponse, Spider, PushHistoryResponse, ConfigItem } from '@/types/dashboard';

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
    push: PushState;
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
    config: ConfigState;
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
// Dashboard/Server/Config
export interface ConfigState {
    configList: ConfigItem[];
    nowEditingConfig: ConfigItem;
    isLoading: boolean;
    createConfigModalVisible: boolean;
    createConfigModalLoading: boolean;
    editConfigModalVisible: boolean;
    editConfigModalLoading: boolean;
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
    editSpiderModalVisible: boolean;
    editSpiderLoading: boolean;
    frequencyUpdateLoading: boolean;
    nowEditingSpider: Spider;
}

// Dashboard/Push

export interface PushState {
    history: PushHistoryState;
}

// Dashboard/Push/History

export interface PushHistoryState {
    isLoading: boolean;
    pushHistory: PushHistoryResponse;
}