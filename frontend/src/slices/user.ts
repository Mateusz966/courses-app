/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReq } from '../../../types/user';
import { history } from '../config/history';

const redirectToLogin = () => history.push('/');



export interface UserState {
  details: UserReq | null;
}

const user = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserReq>) => {
      console.log(action); 
      state.details = action.payload;
    },
  },
  extraReducers: {

  },
});

export const { setUser } = user.actions;

export default user.reducer;
