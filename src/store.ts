import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
//import { createEpicMiddleware } from 'redux-observable';
//import createRootEpic from './epics';
import createRootReducer from './reducers';

declare var process: any;

export default function configureStore(initialState = {}, history) {
  //const epicMiddleware = createEpicMiddleware(createRootEpic());
  const middlewares = [
    //epicMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
      window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : compose;

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  return store;
}
