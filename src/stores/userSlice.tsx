import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: IUserState = {
  isLoggedIn: false,
  email: '',
};

const updateIsLoggedIn: CaseReducer<IUserState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isLoggedIn = action.payload;
};

const updateUser: CaseReducer<IUserState, PayloadAction<IUserState>> = (
  state,
  action
) => {
  state.isLoggedIn = action.payload.isLoggedIn;
  state.email = action.payload.email;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsLoggedIn,
    updateUser,
  },
});

export const userActions = userSlice.actions;

export default userSlice;
