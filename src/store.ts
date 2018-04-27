import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import effects from 'app/effects';
import rootReducer, { RootState } from 'app/reducers';

const middleware: Middleware[] = [];
middleware.push( effectsMiddleware( effects ) );

export default function configureStore ( initialState?: RootState ): Store<RootState> {
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;

  const enhance = [
    applyMiddleware( ...middleware ),
  ];

  let composition = compose;
  if ( process.env.NODE_ENV !== 'production' ) {
    composition = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore<RootState>( rootReducer as any, composition( ...enhance ) );

  if ( module.hot ) {
    module.hot.accept( 'app/reducers', () => {
      const nextReducer = require( 'app/reducers' );
      store.replaceReducer( nextReducer );
    } );
  }

  return store;
}
