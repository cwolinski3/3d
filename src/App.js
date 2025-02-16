
    import React, { useState } from 'react';

    function App() {
        const [question, setQuestion] = useState('What is the capital of France?');
        const [answer, setAnswer] = useState('');
        const [feedback, setFeedback] = useState('');

        const checkAnswer = () => {
            if (answer.toLowerCase() === 'paris') {
                setFeedback('Correct!');
            } else {
                setFeedback('Incorrect. Try again!');
            }
        };

        return (
            <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
                <h1>Welcome to 3 Degrees</h1>
                <h2>{question}</h2>
                <input 
                    type="text" 
                    value={answer} 
                    onChange={(e) => setAnswer(e.target.value)} 
                    placeholder="Type your answer" 
                />
                <button onClick={checkAnswer}>Submit</button>
                <p>{feedback}</p>
            </div>
        );
    }

    export default App;
    