export interface StatisticsResponse {
    spiderRanking: SpiderRanking;
    levelRanking: LevelRankingItem[];
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