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
import GlobalStyle from '../../styles/GlobalStyle';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import 'antd/dist/antd.css';

export interface SagaStore extends Store {
  sagaTask: Task;
}

const Tour = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Helmet
          title="어디갈래"
          htmlAttributes={{ lang: 'ko' }}
          meta={[
            { charSet: 'UTF-8' },
            {
              name: 'viewport',
              content:
                'content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"',
            },
            {
              httpEquiv: 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'description',
              content: '대한민국 관광지 소개',
            },
            {
              name: 'og:title',
              content: '어디갈래?',
            },
            {
              name: 'og:description',
              content: '대한민국 관광지 소개',
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:image',
              content: 'http://wdywg.site/favicon.ico',
            },
          ]}
          link={[
            {
              rel: 'shortcut icon',
              href: '/favicon.ico',
            },
            {
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap',
            },
          ]}
        />
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
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(configureStore);
export default wrapper.withRedux(withReduxSaga(Tour));
