// tslint:disable-next-line:max-line-length
import {
    StatisticsResponse,
    RecentEventsResponse,
    Job,
    APIKeyPair,
    ServerNode,
    SpiderListResponse,
    Spider,
    ConfigItem,
    SpiderIdentityItem,
    PushAccountList,
    PushAccount,
    PushRuleList,
    PushRuleItem,
    RepositoryList,
    Repository,
    LatencyGraphResponse,
} from "types/dashboard";

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
    deploy: DeployState;
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
    isLoadingLatencyGraph: boolean;
    statistics?: StatisticsResponse;
    latencyData?: LatencyGraphResponse;
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
    serverList: ServerNode[];
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
    identity: SpiderIdentityState;
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

// Dashboard/Spider/Identity
export interface SpiderIdentityState {
    identityList: SpiderIdentityItem[];
    isLoading: boolean;
    nowEditingIdentity: SpiderIdentityItem;
    createIdentityModalVisible: boolean;
    createIdentityModalLoading: boolean;
    editIdentityModalVisible: boolean;
    editIdentityModalLoading: boolean;
}

// Dashboard/Push

export interface PushState {
    account: PushAccountState;
    rule: PushRuleState;
}

// Dashboard/Push/Account

export interface PushAccountState {
    isLoading: boolean;
    accounts: PushAccountList;
    nowEditingAccount: PushAccount;
    createAccountModalVisible: boolean;
    createAccountModalLoading: boolean;
    editAccountModalVisible: boolean;
    editAccountModalLoading: boolean;
}

// Dashboard/Push/Rule

export interface PushRuleState {
    isLoading: boolean;
    rules: PushRuleList;
    nowEditingRule: PushRuleItem;
    createRuleModalVisible: boolean;
    createRuleModalLoading: boolean;
    editRuleModalVisible: boolean;
    editRuleModalLoading: boolean;
}

// Dashboard/Deploy
export interface DeployState {
    repository: DeployRepositoryState;
}

// Dashboard/Depoly/Repository
export interface DeployRepositoryState {
    isLoading: boolean;
    repositories: RepositoryList;
    nowEditingRepository: Repository;
    createRepositoryModalVisible: boolean;
    createRepositoryModalLoading: boolean;
    editRepositoryModalVisible: boolean;
    editRepositoryModalLoading: boolean;
}
