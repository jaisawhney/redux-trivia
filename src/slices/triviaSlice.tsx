import { createSlice } from '@reduxjs/toolkit';


const defaultState = () => {
    return {
        running: false,
        category: '',
        difficulty: '',
        num_questions: 15,
        score: 0,
        timer: 0,
    };
};

export const triviaSlice = createSlice({
    name: 'game',
    initialState: defaultState(),
    reducers: {
        setGameOptions: (state, action) => {
            const { getCategory, getDifficulty, getQuantity } = action.payload;
            state.category = getCategory;
            state.difficulty = getDifficulty;
            state.num_questions = Math.max(Math.min(getQuantity, 50), 1);
            return state;
        },
        startGame: (state) => {
            state.running = true;
            return state;
        },
        stopGame: (state) => {
            state.running = false;
            return state;
        },
    },
});

export const { setGameOptions, startGame, stopGame } =
    triviaSlice.actions;

export default triviaSlice.reducer;
