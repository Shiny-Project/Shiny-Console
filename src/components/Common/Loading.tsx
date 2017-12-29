import React from 'react';

export interface LoadingProps {
    isLoading: boolean;
    error: object | string | number;
}

const Loading = ({ isLoading, error }: LoadingProps) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default Loading;