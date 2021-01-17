import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { userEpic } from '../epics/user';
import userReducer from '../slices/user';


const rootEpic = combineEpics(
  userEpic
);
const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
  user: userReducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic as any);


export type RootState = ReturnType<typeof rootReducer>;
