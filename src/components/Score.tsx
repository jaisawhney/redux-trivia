interface props {
    numQuestions: number,
    questionIdx: number,
    score: number
}

export default function Score(props: props) {
    const { numQuestions, questionIdx, score } = props;

    return (
        <div>
            <p className={'text-gray-500'}>Question {questionIdx + 1}/{numQuestions} | Score {score}</p>
        </div>
    );
}