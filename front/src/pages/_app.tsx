import { AppProps } from 'next/app';
import reducer, { IReducerState, rootSaga } from '../modules';
import { createWrapper } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware, { Task } from 'redux-saga';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/GlobalStyle';
import Layout from '../components/Layout';
import 'antd/dist/antd.css';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const Tour = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(composeWithDevTools(applyMiddleware(...middlewares)));
  const store: SagaStore = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<Store<IReducerState>>(configureStore);

export default wrapper.withRedux(withReduxSaga(Tour));
