import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type appState = {
  appState: string;
  hideBar: boolean;
};

const initialState: appState = {
  appState: '',
  hideBar: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    toggleBar: (state) => {
      state.hideBar = !state.hideBar;
    },
  },
});

export const { setAppState, toggleBar } = appStateSlice.actions;

export default appStateSlice.reducer;
