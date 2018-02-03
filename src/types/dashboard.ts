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

export interface ShinyEvent {
    id: number;
    data: ShinyEventData;
    level: ShinyEventLevel;
    publisher: string;
    hash: string;
    createdAt: string;
    updatedAt: string;
}

export interface ShinyEventData {
    content: string;
    cover: string;
    link: string;
    title: string;
}

export type ShinyEventLevel = 1 | 2 | 3 | 4 | 5;