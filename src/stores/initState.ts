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
            lastError: initialError
        },
        overview: {
            isLoading: false
        }
    }
};