import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Todo from './Todo';

export default history =>
    combineReducers({
        router: connectRouter(history),
        todo: Todo,
    });
