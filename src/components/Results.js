import React from 'react';
import {timeFormat} from "../helpers/Helpers";


const Results = ({score, time, newGame, getQuestions}) => (
    <>
        <h2>GAME OVER</h2>
        <p className="timer">Your Score is {score}</p>
        <p className="timer">Your time is {timeFormat(time)}</p>
        <button
            className="next"
            onClick={() => {
                newGame();
                getQuestions();
            }}>Play Again
        </button>
    </>
);

export default Results;
