import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import userReducer from '../slices/user';
import headerReducer from '../slices/header';

const rootEpic = combineEpics();
const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
  user: userReducer,
  header: headerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof rootReducer>;
