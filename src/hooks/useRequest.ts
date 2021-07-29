import { useEffect, useState } from "react";
import { message } from "antd";

const useRequest = <T>(fetcher: Promise<T>): [T, boolean] => {
    const [response, setResponse] = useState<T>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetcher
            .then((data) => {
                setResponse(data);
            })
            .catch((e) => {
                message.error(e.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fetcher]);
    return [response, isLoading];
};

export default useRequest;
