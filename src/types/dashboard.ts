export interface StatisticsResponse {
    '1day': StatisticsResponseItem[];
    '3days': StatisticsResponseItem[];
    '21days': StatisticsResponseItem[];    
}

export interface StatisticsResponseItem {
    publisher: string;
    count: number;
}