import Loadable from 'react-loadable';
import Loading from '@/components/Common/Loading';
import nprogress from 'nprogress';
const createAsyncComponent = (path: string) => {
    return Loadable({
      loader: () => {
        const promise = import(`../containers/${path}`);
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