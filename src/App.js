
    import React, { useState } from 'react';
    import { questions } from './data/questions';

    const players = ["Player 1", "AI Player"];
    const strengths = { "Player 1": ["History", "Science", "Geography"], "AI Player": ["Science", "Math", "Sports"] };
    const weaknesses = { "Player 1": ["Math", "Sports", "Entertainment"], "AI Player": ["History", "Geography", "Literature"] };

    function App() {
        const [turn, setTurn] = useState(0);
        const [category, setCategory] = useState('History');
        const [degree, setDegree] = useState(1);
        const [questionIndex, setQuestionIndex] = useState(0);
        const [answer, setAnswer] = useState('');
        const [feedback, setFeedback] = useState('');
        const [score, setScore] = useState({ "Player 1": 0, "AI Player": 0 });

        const currentPlayer = players[turn % players.length];
        const currentQuestion = questions[category][questionIndex];

        const aiAnswer = () => {
            const correctChance = strengths[currentPlayer].includes(category) ? 0.8 : weaknesses[currentPlayer].includes(category) ? 0.5 : 0.65;
            return Math.random() < correctChance ? currentQuestion.answer : "Wrong Answer";
        };

        const checkAnswer = () => {
            let correct = currentPlayer === "AI Player" ? aiAnswer() === currentQuestion.answer : answer.toLowerCase() === currentQuestion.answer.toLowerCase();

            if (correct) {
                setFeedback(`${currentPlayer} answered correctly!`);
                setScore(prevScore => ({ ...prevScore, [currentPlayer]: prevScore[currentPlayer] + (degree * 10) }));
                nextQuestion();
            } else {
                setFeedback(`${currentPlayer} answered incorrectly!`);
            }
        };

        const nextQuestion = () => {
            if (questionIndex + 1 < questions[category].length) {
                setQuestionIndex(questionIndex + 1);
                setAnswer('');
                setFeedback('');
            } else {
                setFeedback(`${currentPlayer} has completed this category! Choose a new one.`);
                setQuestionIndex(0);
                setTurn(turn + 1);
            }
        };

        return (
            <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
                <h1>3 Degrees</h1>
                <h2>{currentPlayer}'s Turn</h2>
                <h2>Category: {category}</h2>
                <h3>Degree {degree}</h3>
                <h2>{currentQuestion.question}</h2>
                {currentPlayer === "AI Player" ? (
                    <button onClick={checkAnswer}>AI Answer</button>
                ) : (
                    <>
                        <input 
                            type="text" 
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)} 
                            placeholder="Type your answer" 
                        />
                        <button onClick={checkAnswer}>Submit</button>
                    </>
                )}
                <p>{feedback}</p>
                <h3>Score:</h3>
                <p>Player 1: {score["Player 1"]} | AI Player: {score["AI Player"]}</p>
            </div>
        );
    }

    export default App;
    