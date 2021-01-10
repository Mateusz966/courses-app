import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable';


const rootEpic = combineEpics();
const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);


export type RootState = ReturnType<typeof rootReducer>;
