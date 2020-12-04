import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers/index';
import { createBrowserHistory } from 'history';
//import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

const history = createBrowserHistory();
//const routeMiddleware = routerMiddleware(history);
//const sagaMiddleware = createSagaMiddleware();
const envType = (window.appConfig || {}).env || process.env.REACT_APP_ENV || process.env.NODE_ENV;

const middlewares = [thunk];
const composeEnhancers = (envType !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore() {
    const resetEnhancer = rootReducer => (state, action) => {
        if (action.type !== 'RESET') return rootReducer(state, action);
        const newState = rootReducer(undefined, {});
        newState.router = state.router;
        return newState;
    };
    const store = createStore(resetEnhancer(reducers(history)), composeEnhancers(applyMiddleware(...middlewares)));

    //sagaMiddleware.run(rootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
export { history };
