import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import uiSlice from './uiSlice';
import userSlice from './userSlice';

// export const store = configureStore({
//   reducer: {
//     ui: uiSlice.reducer,
//     user: userSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  user: userSlice.reducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
