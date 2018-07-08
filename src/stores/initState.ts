import { StoreState } from '@/types';

const initialError = new Error('初始化占位错误');
initialError.name = 'initial_error';
export default {
    user: {
        isLogin: false,
        userName: '',
        loading: false,
    },
    dashboard: {
        errors: {
            lastError: initialError,
            errorId: Math.random()
        },
        overview: {
            isLoading: false
        },
        realtime: {
            isLoading: false,
            recentEvents: {
                total: 0,
                events: []
            },
            recentJobs: []
        },
        server: {
            node: {
                isLoading: false,
                modalVisible: false,
                modalLoading: false,
                serverList: []
            },
            application: {
                isLoading: false,
                keyPairs: [],
                serverList: [],
                createModalVisible: false,
                createModalLoading: false
            },
            config: {
                configList: [],
                nowEditingConfig: {
                    key: '',
                    value: ''
                },
                isLoading: false,
                createConfigModalVisible: false,
                createConfigModalLoading: false,
                editConfigModalVisible: false,
                editConfigModalLoading: false
            }
        },
        spider: {
            list: {
                spiderList: [],
                isLoading: false,
                comfirmLoading: false,
                frequencyUpdateModalVisible: false,
                editSpiderModalVisible: false,
                editSpiderLoading: false,
                frequencyUpdateLoading: false,
                nowEditingSpider: {}
            }
        },
        push: {
            history: {
                isLoading: false,
                pushHistory: {
                    total: 0,
                    jobs: []
                }
            }
        }
    },
} as StoreState;