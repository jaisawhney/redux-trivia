import './App.css';
import OptionsForm from './components/OptionsForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import GameArea from './components/GameArea';
import GameOver from './components/GameOver';


function App() {
    const { running, gameOver } = useSelector((state: RootState) => state.quiz);

    return (
        <div className='m-0 h-screen w-full flex flex-col justify-center items-center bg-slate-100'>
            <div className={''}>
                <h1 className={'my-2 text-3xl font-medium'}>Quiz</h1>
                <div className={'p-5 bg-white rounded-xl shadow-lg'}>
                    {gameOver && <GameOver />}
                    {running && <GameArea />}
                    {(!gameOver && !running) && <OptionsForm />}
                </div>
            </div>
        </div>
    );
}

export default App;
