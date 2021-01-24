import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderState {
  title: string;
  subtitle?: string;
  back?: string;
  noLeft?: boolean;
  hideOnMobile?: boolean;
  hide?: boolean;
}

const initialState: HeaderState = {
  title: '',
  subtitle: '',
  back: '',
  noLeft: false,
  hideOnMobile: false,
  hide: false,
};


const header = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<HeaderState>) => {
      console.log(action)
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {},
});

export const { setHeader } = header.actions;

export default header.reducer;
