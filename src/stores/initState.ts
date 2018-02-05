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
            recentEvents: [],
            recentJobs: []
        }
    },
};