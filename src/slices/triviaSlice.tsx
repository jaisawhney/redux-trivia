import { createSlice } from '@reduxjs/toolkit';


const defaultState = () => {
    return {
        running: false,
        category: '',
        difficulty: '',
        num_questions: 50,
        score: 0,
    };
};

export const triviaSlice = createSlice({
    name: 'game',
    initialState: defaultState(),
    reducers: {
        setRunning: (state, action) => {
            state.running = action.payload;
            return state;
        },
    },
});

export const { setRunning } =
    triviaSlice.actions;

export default triviaSlice.reducer;
