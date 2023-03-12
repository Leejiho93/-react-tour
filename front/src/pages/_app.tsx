import * as React from 'react';
import { AppProps } from 'next/app';
import reducer, { rootSaga } from '../modules';
import { createWrapper } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware, { Task } from 'redux-saga';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import fontFace from '../../styles/fontFace';
import Head from 'next/head';
import 'antd/dist/antd.css';

export interface SagaStore extends Store {
  sagaTask: Task;
}

const Tour = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <style>{fontFace}</style>
          <title>어디갈래</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0,user-scalable=yes,viewport-fit=cover"
          />
        </Head>
        <Component {...pageProps} />
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
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(configureStore);
export default wrapper.withRedux(withReduxSaga(Tour));
