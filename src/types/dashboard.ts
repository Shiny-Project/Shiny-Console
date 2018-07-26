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
    publisher: string; // 发布者
    count: number; // 事件数
}

export interface LevelRankingItem {
    level: string; // 事件等级
    count: number; // 事件数
}

// Dashboard/Realtime

export type RecentEventsResponse = {
    total: number;
    events: ShinyEvent[];
};

// Shiny 事件
export interface ShinyEvent {
    id?: number; // 事件 ID
    data: ShinyEventData; // 事件详细数据
    level: ShinyEventLevel; // 事件等级
    publisher: string; // 事件发布者
    hash: string; // 事件 Hash
    createdAt?: string;
    updatedAt?: string;
}

// Shiny 事件数据
export interface ShinyEventData {
    content: string; // 内容
    cover: string; // 封面
    link: string; // 链接
    title: string; // 标题
}

// Shiny 事件等级
export type ShinyEventLevel = 1 | 2 | 3 | 4 | 5;

// Shiny Websocket 广播消息
export interface EventSocketMessage {
    level: ShinyEventLevel; // 事件等级
    spiderName: string; // 爬虫名
    hash: string; // 事件 Hash
    data: ShinyEventData; // 事件详细数据
}

export interface BaseJob {
    type: string;
    status: string; // 任务状态
    done_by: string; // 完成者
    createdAt: string;
    updatedAt: string;
}

export interface DataRefreshJob extends BaseJob {
    id: number; // 任务 ID
    type: 'data_refresh'; // 任务类型
    spider: string; // 任务爬虫
    path: string; // 爬虫路径
    info?: string; // 任务附加信息
}

export interface PushJob extends BaseJob {
    type: 'push';
    info: PushJobInfo;
}

export interface PushJobInfo {
    channel: string; // 推送渠道
    account: string; // 推送账号
    text: string; // 推送内容
    response: string; // 推送返回结果
}

export type Job = DataRefreshJob;

// 任务状态广播信息
export interface JobStatusMessage {
    type: 'create' | 'update'; // 状态更新类型
    job: Job; // 更新事件
}

// Dashboard/Server/Node

export type ServerListResponse = ServerNodeWithKeyPair[];

export interface ServerNode {
    id: number; // ID
    name: string; // 服务器节点名
    type: string; // 服务器节点类型
    host: string; // 服务器节点地址
    group: string[]; // 服务器组
    createdAt: string;
    updatedAt: string;
    key_pair: number | APIKeyPair; // 服务器密钥对 展开或不展开
}

export interface ServerNodeWithKeyPair extends ServerNode {
    key_pair: APIKeyPair; // 服务器密钥对 展开
}

// Dashboard/Server/Application

export interface APIKeyPairsResponse {
    keyPairs: APIKeyPair[]; // 全部服务器密钥对
    serverList: ServerNode[]; // 全部服务器节点列表
}

export interface APIKeyPair {
    id: number;
    api_key: string; // API_KEY
    api_secret_key: string; // API_SECRET_KEY
    tag: ServerNode[]; // 绑定服务器标签
}

export interface SpiderInfo {
    expires: number;
    identity?: string;
    cooldown?: number;
}

// Dashboard/Server/Config

export interface ConfigItem {
    key: string;
    value: string;
}

export type ConfigListResponse = ConfigItem[];

// Dashboard/Spider/Identity

export interface SpiderIdentityItem {
    id: number;
    name: string;
    identity: object;
}

export type SpiderIdentityListResponse = SpiderIdentityItem[];

export interface Spider {
    id: number;
    name: string;
    path: string;
    group: string;
    description: string;
    info: SpiderInfo;
    trigger_count: number;
    trigger_time: string;
}

export type SpiderListResponse = Spider[];

export interface PushHistoryResponse {
    total: number;
    jobs: PushJob[];
}