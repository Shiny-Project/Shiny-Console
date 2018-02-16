// Dashboard/Overview
export interface StatisticsResponse {
    spiderRanking: SpiderRanking;
    levelRanking: LevelRankingItem[];
    jobStatus: StatusItem[];
}

export interface StatusItem {
    status: string;
    count: number;
}

export interface SpiderRanking {
    '1day': SpiderRankingItem[];
    '3days': SpiderRankingItem[];
    '21days': SpiderRankingItem[];
}

export interface SpiderRankingItem {
    publisher: string;
    count: number;
}

export interface LevelRankingItem {
    level: string;
    count: number;
}

// Dashboard/Realtime

export type RecentEventsResponse = ShinyEvent[];

// Shiny 事件
export interface ShinyEvent {
    id?: number;
    data: ShinyEventData;
    level: ShinyEventLevel;
    publisher: string;
    hash: string;
    createdAt?: string;
    updatedAt?: string;
}

// Shiny 事件数据
export interface ShinyEventData {
    content: string;
    cover: string;
    link: string;
    title: string;
}

// Shiny 事件等级
export type ShinyEventLevel = 1 | 2 | 3 | 4 | 5;

// Shiny Websocket 广播消息
export interface EventSocketMessage {
    level: ShinyEventLevel;
    spiderName: string;
    hash: string;
    data: ShinyEventData;
}

export interface DataRefreshJob {
    id: number;
    type: 'data_refresh';
    spider: string;
    path: string;
    info?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type Job = DataRefreshJob;

// 任务状态广播信息
export interface JobStatusMessage {
    type: 'create' | 'update';
    job: Job;
}

// Dashboard/Server/Node

export type ServerListResponse = ServerNodeWithKeyPair[];

export interface ServerNode {
    id: number;
    name: string;
    type: string;
    host: string;
    createdAt: string;
    updatedAt: string;
    key_pair: number | APIKeyPair;
}

export interface ServerNodeWithKeyPair extends ServerNode {
    key_pair: APIKeyPair;
}

// Dashboard/Server/Application

export interface APIKeyPairsResponse {
    keyPairs: APIKeyPair[];
    serverList: ServerNode[];
}

export interface APIKeyPair {
    id: number;
    api_key: string;
    api_secret_key: string;
    tag: ServerNode[];
}