import {
  CaseReducer,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

interface IUserState {
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  isLoggedIn: false,
};


const updateIsLoggedIn: CaseReducer<IUserState, PayloadAction<boolean>> = (
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

export const userActions = userSlice.actions;

export default userSlice;
