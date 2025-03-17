import React, { useState } from 'react';

const HomePage = () => {
    // Setting constant variables for the Users Name, Category for questions, and the Difficulty of the questions.
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    // Submit Handling
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>Welcome to the Trivia Quiz App!</h1>
            {/* Form Creation */}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Your Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Select a Trivia Category:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {/* Categories will be populated using API */}
                    </select>
                </label>
                <label>
                    Select a Difficulty:
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <button type="submit">Begin Quiz</button>
            </form>
        </div>
    );
};

export default HomePage;