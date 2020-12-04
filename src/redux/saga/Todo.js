import { all, fork, put, takeEvery, delay } from 'redux-saga/effects';
import * as authType from '../../constants/ActionTypes';

// ------ ROOT SAGA -----------------
export default function* rootSaga() {
    yield all([]);
}
