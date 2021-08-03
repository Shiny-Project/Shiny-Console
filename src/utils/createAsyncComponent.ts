import Loadable from "react-loadable";
import Loading from "components/Common/Loading";
import nprogress from "nprogress";

interface CreateAsyncComponentParams {
    path: string;
    disableProgress?: boolean;
}

const createAsyncComponent = ({
    path,
    disableProgress = false,
}: CreateAsyncComponentParams): any => {
    return Loadable({
        loader: () => {
            const promise = import(`../${path}`);
            !disableProgress && nprogress.start();
            promise.then(() => {
                !disableProgress && nprogress.done();
            });
            return promise;
        },
        loading: Loading,
    });
};
export default createAsyncComponent;
