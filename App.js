import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './src/navigation/Router'
import Store from './src/redux/Store';

export default class App extends Component {

  render() {

    return (
      <Provider store={Store}>

        <Router />

      </Provider>
    );

  }

}