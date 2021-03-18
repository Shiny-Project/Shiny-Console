import React from "react";
import ErrorPage from "components/Common/Error";
import "./Loading.css";

export interface LoadingProps {
    isLoading: boolean;
    loadingText?: string;
    errorText?: string;
    error?: object | string | number;
}

const Loading = ({
    isLoading,
    loadingText = "组件加载中...",
    errorText = "组件加载出现错误",
    error,
}: LoadingProps) => {
    // Handle the loading state
    if (isLoading) {
        return (
            <div className="lds-dual-ring">
                <span className="loading-text">{loadingText}</span>
            </div>
        );
    } else if (error) {
        return <ErrorPage message={errorText} />;
    } else {
        return null;
    }
};

export default Loading;
