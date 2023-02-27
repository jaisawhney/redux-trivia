import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import React, { useEffect, useState } from 'react';
import { setScore, stopGame } from '../slices/triviaSlice';
import Loading from './Loading';
import Question from './Question';
import Score from './Score';

interface question {
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: []
}

export default function GameArea() {
    const [getQuestions, setQuestions] = useState([]);
    const [getQuestionIdx, setQuestionIdx] = useState(0);
    const question: question = getQuestions[getQuestionIdx];

    const dispatch = useDispatch();
    const {
        category,
        difficulty,
        numQuestions,
        score,
    } = useSelector((state: RootState) => state.quiz);

    useEffect(() => {
        const fetchQuestions = async () => {
            const url = new URL('https://opentdb.com/api.php');
            url.searchParams.append('category', category);
            url.searchParams.append('difficulty', difficulty);
            url.searchParams.append('amount', numQuestions.toString());
            url.searchParams.append('type', 'multiple');

            const res = await fetch(url.href);
            const json = await res.json();
            setQuestions(json.results);
        };
        fetchQuestions();
    }, [category, difficulty, numQuestions]);


    const advanceQuestion = () => {
        const newIdx = getQuestionIdx + 1;

        //Game Over
        if (newIdx === numQuestions) return dispatch(stopGame());

        setQuestionIdx(newIdx);
    };

    const handleResponse = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.currentTarget;
        const selectedOption = target.dataset.option;

        if (selectedOption === question.correct_answer) {
            // Correct Answer
            dispatch(setScore(score + 50));
            target.classList.add('hover:bg-green-500');
        } else {
            // Incorrect Answer
            target.classList.add('hover:bg-red-500');
        }

        // Reset Colors
        setTimeout(() => {
            advanceQuestion();
            target.classList.remove('hover:bg-red-500', 'hover:bg-green-500');
        }, 250);
    };

    if (!getQuestions.length)
        return <Loading />;

    return (
        <div>
            <Score numQuestions={numQuestions} questionIdx={getQuestionIdx} score={score} />
            <Question info={question} handleResponse={handleResponse} />
        </div>
    );
}