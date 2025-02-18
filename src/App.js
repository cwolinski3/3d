
    import React, { useState } from 'react';
    import { questions } from './data/questions';

    const players = ["Player 1", "AI Player"];
    const strengths = { "Player 1": ["History", "Science", "Geography"], "AI Player": ["Science", "Math", "Sports"] };
    const weaknesses = { "Player 1": ["Math", "Sports", "Entertainment"], "AI Player": ["History", "Geography", "Literature"] };

    function App() {
        const [turn, setTurn] = useState(0);
        const [selectedCategory, setSelectedCategory] = useState(null);
        const [degree, setDegree] = useState(1);
        const [questionIndex, setQuestionIndex] = useState(0);
        const [answer, setAnswer] = useState('');
        const [feedback, setFeedback] = useState('');
        const [score, setScore] = useState({ "Player 1": 0, "AI Player": 0 });

        const currentPlayer = players[turn % players.length];

        const selectCategory = (category) => {
            setSelectedCategory(category);
            setDegree(1);
            setQuestionIndex(0);
            setFeedback('');
        };

        const currentQuestion = selectedCategory ? questions[selectedCategory][questionIndex] : null;

        const aiAnswer = () => {
            const correctChance = strengths[currentPlayer].includes(selectedCategory) ? 0.8 : weaknesses[currentPlayer].includes(selectedCategory) ? 0.5 : 0.65;
            return Math.random() < correctChance ? currentQuestion.answer : "Wrong Answer";
        };

        const checkAnswer = () => {
            let correct = currentPlayer === "AI Player" ? aiAnswer() === currentQuestion.answer : 
                (Array.isArray(currentQuestion.answer) ? currentQuestion.answer.includes(answer) : answer.toLowerCase() === currentQuestion.answer.toLowerCase());

            if (correct) {
                setFeedback(`${currentPlayer} answered correctly!`);
                setScore(prevScore => ({ ...prevScore, [currentPlayer]: prevScore[currentPlayer] + (degree * 10) }));
                if (degree < 3) {
                    setDegree(degree + 1);
                } else {
                    setFeedback(`${currentPlayer} has mastered ${selectedCategory}! Choose a new category.`);
                    setSelectedCategory(null);
                    setTurn(turn + 1);
                }
            } else {
                setFeedback(`${currentPlayer} answered incorrectly!`);
                setTurn(turn + 1);
                setSelectedCategory(null);
            }
        };

        return (
            <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
                <h1>3 Degrees</h1>
                <h2>{currentPlayer}'s Turn</h2>

                {!selectedCategory ? (
                    <>
                        <h3>Select a Category:</h3>
                        {Object.keys(questions).map(category => (
                            <button key={category} onClick={() => selectCategory(category)}>{category}</button>
                        ))}
                    </>
                ) : (
                    <>
                        <h2>Category: {selectedCategory}</h2>
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
                    </>
                )}
                <h3>Score:</h3>
                <p>Player 1: {score["Player 1"]} | AI Player: {score["AI Player"]}</p>
            </div>
        );
    }

    export default App;
    