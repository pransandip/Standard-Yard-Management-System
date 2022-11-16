import {
    configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducers from '../reducers/AuthenticationSlice';
import {
    watchHomeProcessServices
} from '../Sagas';

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {
        auth: authReducers
    },
    middleware: [saga]
})
saga.run(watchHomeProcessServices);
export default store;