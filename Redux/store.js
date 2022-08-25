import {configureStore} from '@reduxjs/toolkit';
import LoginReducer from './Reducers/LoginReducer';

const store = configureStore({
  reducer: LoginReducer,
});

export default store;
