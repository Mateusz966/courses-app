/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiErrorCode } from  'app-types/global';


export type NotificationType = 'success' | 'error';

export type NotificationState = {
  text: string;
  type: NotificationType  
}

const getNotification = (text: string, type: NotificationType) => ({
  type,
  text,
});

const getError = (error: ApiErrorCode) => {
  switch (error) {
    case ApiErrorCode.ErrorDuringLogin:
      return 'Błąd podczas logowania'
    case ApiErrorCode.InvalidCredentials:
      return 'Niepoprawne dane logowania'
    default:
      return 'Wystąpił błąd';
  }
};

const user = createSlice({
  name: 'user',
  initialState: [] as NotificationState[],
  reducers: {
    successNotification: (state, action: PayloadAction<string>) => {
      const notification = getNotification(action.payload, 'success');
      return [...state, notification];
    },
    errorNotification: (state, action: PayloadAction<ApiErrorCode>) => {
      const notification = getNotification(getError(action.payload), 'error');
      return [...state, notification]
    }
  },
  extraReducers: {

  },
});

export const { successNotification, errorNotification } = user.actions;

export default user.reducer;
