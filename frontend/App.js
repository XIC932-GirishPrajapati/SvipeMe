/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainNavigator from './navigation/navigation';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import auth from './store/reducer/auth';
import candidate from './store/reducer/candidateorrecruiter';
const rootReducer = combineReducers({
  auth: auth,
  candidate: candidate,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
    // <SomeComponent />
  );
};
export default App;
