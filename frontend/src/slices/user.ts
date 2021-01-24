import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReq } from '../app-types/user';
import { history } from '../config/history';

export const redirectToLogin = () => history.push('/');

export interface UserState {
  details: UserReq | null;
}

const user = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserReq>) => {
      state.details = action.payload;
    },
    clearUser: (state) => {
      state.details = null;
    },
  },
  extraReducers: {},
});

export const { setUser, clearUser } = user.actions;

export default user.reducer;
