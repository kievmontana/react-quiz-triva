import React, {Component} from 'react';
import axios from 'axios';

import Timer from "./Timer";
import Results from "./Results";
import Question from "./Question";

const API_URL = 'https://opentdb.com/api.php?amount=10';


class Quiz extends Component {

    state = {
        newGame: false,
        endGame: false,
        currentQuestion: 0,
        userAnswer: null,
        score: 0,
        time: 0,
        timerSet: false,
        disabled: true,
        questions: [],
        question: null
    };

    // Get questions from API
    getQuestions = () => {

        axios.get(API_URL).then(response => {
                const questions = response.data.results;

                this.setState(prevState => ({
                    ...prevState,
                    questions
                }));
            }
        ).catch(error => console.log(error));
    };

    componentDidMount() {
        this.getQuestions();
    }

    setQuestion = () => {
        const {currentQuestion, questions} = this.state;

        // Push answer to options array at random idx
        const options = [...questions[currentQuestion].incorrect_answers];
        const answer = questions[currentQuestion].correct_answer;
        let randIdx = Math.floor(Math.random() * options.length) + 1;

        options.splice(randIdx - 1, 0, answer);

        this.setState({
            disabled: true,
            question: {
                question: questions[currentQuestion].question,
                answer: questions[currentQuestion].correct_answer,
                options: options
            }
        });

    };

    newGame = () => {
        this.setState({
            startGame: !this.state.startGame,
            newGame: true,
            endGame: false,
            score: 0,
            currentQuestion: 0,
            time: 0,
            timerSet: true
        });

        this.setQuestion();
    };

    endGame = answer => {
        if (this.state.currentQuestion === this.state.questions.length - 1) {
            this.setState({
                newGame: false,
                endGame: true,
            });

            if (answer === this.state.userAnswer) {
                this.setState({
                    score: this.state.score + 1
                })
            }
        }
    };

    nextQuestion = answer => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });

        if (answer === this.state.userAnswer) {
            this.setState({
                score: this.state.score + 1
            })
        }
    };

    // Update the component to switch questions
    componentDidUpdate(prevProps, prevState) {
        const {currentQuestion} = this.state;

        if (currentQuestion !== prevState.currentQuestion) {
            this.setQuestion();
        }
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    };

    clearTimer = time => {
        this.setState({
            time: this.state.time + time,
            timerSet: false,
        })
    };

    render() {

        const {newGame, endGame, questions, question, currentQuestion, userAnswer, disabled} = this.state;

        if (newGame) {
            return (
                <>
                    {this.state.timerSet && <Timer clearTimer={this.clearTimer}/>}

                    <Question
                        questions={questions}
                        question={question}
                        currentQuestion={currentQuestion}
                        userAnswer={userAnswer}
                        disabled={disabled}
                        endGame={this.endGame}
                        checkAnswer={this.checkAnswer}
                        nextQuestion={this.nextQuestion}
                    />
                </>
            );
        }

        if (endGame) {
            return (
                <Results
                    score={this.state.score}
                    time={this.state.time}
                    newGame={this.newGame}
                    getQuestions={this.getQuestions}
                />
            )
        }

        return (
            <>
                <h2>Welcome to React.js Quiz</h2>
                <p>Press button to start a New Game</p>
                <button className="next" onClick={() => this.newGame()}>Start Quiz</button>
            </>
        );

    }
}

export default Quiz;
