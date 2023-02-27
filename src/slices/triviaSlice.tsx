import { createSlice } from '@reduxjs/toolkit';


const defaultState = () => ({
    running: false,
    gameOver: false,
    category: '',
    difficulty: '',
    numQuestions: 15,
    score: 0,
});

export const triviaSlice = createSlice({
    name: 'game',
    initialState: defaultState(),
    reducers: {
        setGameOptions: (state, action) => {
            const { getCategory, getDifficulty, getQuantity } = action.payload;
            state.category = getCategory;
            state.difficulty = getDifficulty;
            state.numQuestions = Math.max(Math.min(getQuantity, 50), 1);
            return state;
        },
        startGame: (state) => {
            state.running = true;
            return state;
        },
        stopGame: (state) => {
            state.running = false;
            state.gameOver = true;
            return state;
        },
        resetGame: () => defaultState(),
        setScore: (state, action) => {
            state.score = action.payload;
            return state;
        },
    },
});

export const { setGameOptions, startGame, stopGame, resetGame, setScore } =
    triviaSlice.actions;

export default triviaSlice.reducer;
