import { configureStore } from '@reduxjs/toolkit';

import triviaSlice from '../slices/triviaSlice';

export const store = configureStore({
    reducer: {
        quiz: triviaSlice,
    },
});

export type  RootState = ReturnType<typeof store.getState>