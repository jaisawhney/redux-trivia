import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { resetGame } from '../slices/triviaSlice';
import React from 'react';

export default function GameOver() {
    const {
        difficulty,
        numQuestions,
        score,
    } = useSelector((state: RootState) => state.quiz);

    const dispatch = useDispatch();

    return (
        <div>
            <h1 className={'text-xl font-medium'}>Game Over</h1>
            <p>Your Score {score}/{numQuestions * 50}</p>
            <p className={'capitalize'}>Difficulty: {difficulty}</p>
            <button
                className={'mt-3 bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded'}
                onClick={() => dispatch(resetGame())}>
                Restart!
            </button>
        </div>
    );
}