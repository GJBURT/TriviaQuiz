import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';

const HomePage = () => {
    // Setting constant variables for the Users Name, Category for questions, and the Difficulty of the questions.
    const [name, setName] = useState('');
    // Set variable for the users selected category
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    // Set variable for holding the different categories that user can choose from.
    const [categories, setCategories] = useState([]);
    // Sets the initial state of the form submission to be false
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Fetching data from the API for categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://opentdb.com/api_category.php');
                const data = await response.json();
                setCategories(data.trivia_categories);
            }
                catch (error) {
                    console.error('Error fetching categories:', error);
                }
        };

        fetchCategories();
    }, []);
    
    // Submit Handling
    const handleSubmit = (e) => {
        e.preventDefault();
        // Debugging console.logs 
        // Form Submission
        console.log('Form Submitted');
        // Users Name
        console.log('User Name:', name);
        // Category user selected
        console.log('Category:', category);
        // Difficulty user selected
        console.log('Difficulty:', difficulty);
        // Changes form submitted from false to true
        setFormSubmitted(true);
    };


    return (
        <div>
            <h1>Welcome to the Trivia Quiz App!</h1>
            {/* Initial Form Creation */}
            {!formSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a Trivia Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="">Select a Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button type="submit">Begin Quiz</button>
                </form>
            ) : (
                // Creation of Question Form when the form is submitted
                <QuestionForm category={category} difficulty={difficulty} />
            )}
        </div>
    );
};

export default HomePage;