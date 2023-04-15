import {
  CaseReducer,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

interface IUIState {
  isLoading: boolean;
  isModalOpen: boolean;
  isMobileSidebarOpen: boolean;
}

const initialState: IUIState = {
  isLoading: false,
  isModalOpen: false,
  isMobileSidebarOpen: false,
};

const updateIsLoading: CaseReducer<IUIState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isLoading = action.payload;
};

const updateIsModalOpen: CaseReducer<IUIState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isModalOpen = action.payload;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateIsLoading,
    updateIsModalOpen,
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
