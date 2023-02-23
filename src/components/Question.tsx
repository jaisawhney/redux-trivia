import { unescapeSpecialChars } from '../utils/utils';
import React from 'react';

interface props {
    info: {
        category: string,
        question: string
        correct_answer: string,
        incorrect_answers: []
    },
    handleResponse: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export default function Question(props: props) {

    const { info, handleResponse } = props;
    const question = unescapeSpecialChars(info.question);
    const correctAnswer = info.correct_answer;

    // Shuffle works good enough for small arrays
    const options: string[] = [correctAnswer, ...info.incorrect_answers]
        .sort(() => 0.5 - Math.random());

    return (
        <div>
            <h1 className={'text-xl font-medium'}>
                {unescapeSpecialChars(question)}
            </h1>

            <ul>
                {options.map((option, idx) =>
                    <li
                        key={`option-${idx}`}
                        className={'text-md p-2 my-1 border border-slate-300 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white'}
                        onClick={handleResponse}
                        data-option={option}
                    >
                        {unescapeSpecialChars(option)}
                    </li>,
                )}
            </ul>
        </div>
    );
}