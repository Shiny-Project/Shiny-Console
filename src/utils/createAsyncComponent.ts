import Loadable from "react-loadable";
import Loading from "components/Common/Loading";
import nprogress from "nprogress";

interface CreateAsyncComponentParams {
    path: string;
}

const createAsyncComponent = ({ path }: CreateAsyncComponentParams) => {
    return Loadable({
        loader: () => {
            const promise = import(`../components/${path}`);
            nprogress.start();
            promise.then(() => {
                nprogress.done();
            });
            return promise;
        },
        loading: Loading,
    });
};
export default createAsyncComponent;
