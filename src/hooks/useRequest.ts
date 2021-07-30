import { useEffect, useState, useRef } from "react";
import { message } from "antd";

const useRequest = <T>(fetcher: () => Promise<T>): [T, boolean] => {
    const [response, setResponse] = useState<T>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetcherRef = useRef(fetcher);
    useEffect(() => {
        setIsLoading(true);
        fetcherRef.current()
            .then((data) => {
                setResponse(data);
            })
            .catch((e) => {
                message.error(e.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return [response, isLoading];
};

export default useRequest;
