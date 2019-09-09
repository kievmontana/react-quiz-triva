import React from 'react';
import uuid from "uuid/v4";


const Question = ({questions, question, currentQuestion, userAnswer, disabled, endGame, checkAnswer, nextQuestion}) => (
    <>
        <span className="question-count">{`Question ${currentQuestion + 1} from ${questions.length}`}</span>
        <h3 dangerouslySetInnerHTML={{__html: question.question}}/>
        <div className="questions">
            {question.options.map(answer => (
                <button
                    key={uuid()}
                    onClick={() => checkAnswer(answer)}
                    className={`${userAnswer === answer ? "question is-active" : 'question'}`}
                    dangerouslySetInnerHTML={{__html: answer}}
                />
            ))}
        </div>
        {currentQuestion < questions.length - 1 ? (
            <button
                className="next"
                disabled={disabled}
                onClick={() => nextQuestion(question.answer)}
            >Next Question</button>) : (
            <button
                className="next"
                disabled={disabled}
                onClick={() => endGame(question.answer)}
            >Finish Quiz</button>
        )}
    </>
);

export default Question;
