
    import React, { useState } from 'react';
    import { questions } from './data/questions';

    function App() {
        const [category, setCategory] = useState('History');
        const [degree, setDegree] = useState(1);
        const [questionIndex, setQuestionIndex] = useState(0);
        const [answer, setAnswer] = useState('');
        const [feedback, setFeedback] = useState('');
        const [score, setScore] = useState(0);

        const currentQuestion = questions[category][questionIndex];

        const checkAnswer = () => {
            if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                setFeedback('Correct!');
                setScore(score + (degree * 10));
                nextQuestion();
            } else {
                setFeedback('Incorrect. Try again!');
            }
        };

        const nextQuestion = () => {
            if (questionIndex + 1 < questions[category].length) {
                setQuestionIndex(questionIndex + 1);
                setAnswer('');
                setFeedback('');
            } else {
                setFeedback("You've completed this category!");
            }
        };

        return (
            <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
                <h1>Welcome to 3 Degrees</h1>
                <h2>Category: {category}</h2>
                <h3>Degree {degree}</h3>
                <h2>{currentQuestion.question}</h2>
                <input 
                    type="text" 
                    value={answer} 
                    onChange={(e) => setAnswer(e.target.value)} 
                    placeholder="Type your answer" 
                />
                <button onClick={checkAnswer}>Submit</button>
                <p>{feedback}</p>
                <h3>Score: {score}</h3>
            </div>
        );
    }

    export default App;
    