import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { studentsApi } from '../features/students/studentsApi';
import loggerMiddleware from './middleware/logger';

export const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(studentsApi.middleware)
      .concat(loggerMiddleware),
});

setupListeners(store.dispatch);
