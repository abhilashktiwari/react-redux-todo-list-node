import { all } from 'redux-saga/effects';
import todoSaga from './Todo';

export default function* rootSaga() {
    yield all([
        todoSaga(),
    ]);
}
