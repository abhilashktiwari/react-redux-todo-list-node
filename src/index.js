import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import SocketWithId from './components/SocketWithId';
import { Grid } from "@material-ui/core";
import configureStore, { history } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';

export const store = configureStore();

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Layout />
        <SocketWithId selectedRoomId={10001} username={'Abhi'} />
      </Grid>
    </ConnectedRouter>
  </Provider>,
  app
);
