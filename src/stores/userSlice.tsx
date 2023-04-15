import {
  CaseReducer,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

interface IUIState {
  user: Object;
  isLoggedIn: boolean;
}

const initialState: IUIState = {
  user: {},
  isLoggedIn: false,
};

const updateIsLoggedIn: CaseReducer<IUIState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isLoggedIn = action.payload;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsLoggedIn,
  },
});

export const uiActions = userSlice.actions;

export default userSlice;
