import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import userReducer from '../slices/user';
import notificationReducer from '../slices/notification';


const rootEpic = combineEpics();
const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

epicMiddleware.run(rootEpic);


export type RootState = ReturnType<typeof rootReducer>;
