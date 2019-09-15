import React from 'react';
import ErrorPage from 'components/Common/Error';
import './Loading.css';

export interface LoadingProps {
    isLoading: boolean;
    error: object | string | number;
}

const Loading = ({ isLoading, error }: LoadingProps) => {
    // Handle the loading state
    if (isLoading) {
        return (
            <div className="lds-dual-ring">
                <span className="loading-text">组件加载中...</span>
            </div>
        );
    } else if (error) {
        return <ErrorPage message="组件加载出现错误" />;
    } else {
        return null;
    }
};

export default Loading;