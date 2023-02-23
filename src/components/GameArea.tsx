import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Question from './Question';
import Score from './Score';

interface props {
    category: string,
    question: string
    correct_answer: string,
    incorrect_answers: []
}

export default function GameArea() {
    const [getQuestions, setQuestions] = useState([]);
    const [getQuestionIdx, setQuestionIdx] = useState(0);
    const question: props = getQuestions[getQuestionIdx];

    const { category, difficulty, num_questions } = useSelector((state: RootState) => state.quiz);

    useEffect(() => {
        const fetchQuestions = async () => {
            const url = new URL('https://opentdb.com/api.php');
            url.searchParams.append('category', category);
            url.searchParams.append('difficulty', difficulty);
            url.searchParams.append('amount', num_questions.toString());
            url.searchParams.append('type', 'multiple');

            const res = await fetch(url.href);
            const json = await res.json();
            setQuestions(json.results);
        };
        fetchQuestions();
    }, [category, difficulty, num_questions]);

    if (!getQuestions.length)
        return <Loading />;

    return (
        <div>
            <Score/>
            <Question info={question} />
        </div>
    );
}