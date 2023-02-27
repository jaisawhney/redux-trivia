import { parseSpecialChars } from '../utils';
import React, { useEffect, useState } from 'react';

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
    const [getOptions, setOptions] = useState<string[]>([]);

    const question = parseSpecialChars(info.question);
    const correctAnswer = info.correct_answer;

    useEffect(() => {
        // Shuffle works well enough for small arrays
        setOptions([correctAnswer, ...info.incorrect_answers]
            .sort(() => 0.5 - Math.random()));
    }, [correctAnswer, info]);

    return (
        <div>
            <h1 className={'text-xl font-medium'}>
                {parseSpecialChars(question)}
            </h1>

            <ul>
                {getOptions.map((option, idx) =>
                    <li
                        key={`option-${idx}`}
                        className={'select-none text-md p-2 my-1 border border-slate-300 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white'}
                        onClick={handleResponse}
                        data-option={option}
                    >
                        {parseSpecialChars(option)}
                    </li>,
                )}
            </ul>
        </div>
    );
}