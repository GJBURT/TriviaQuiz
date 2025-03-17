import React, { useState, useEffect } from 'react';

const QuestionForm = ({category, difficulty}) => {
    // Setting up variables for Questions, Loading, and Errors
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Fetching data from the API
    useEffect(() => {
        // Making sure there are valid inputs
        if (!category || !difficulty) return;

        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                    console.log("Fetching questions...");
                    // Adding a 1 second delay before the API request
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
                        // Converting the response to json
                        if (!response.ok) {
                            throw new Error (`HTTP error! Status: ${response.status}`);
                        }
                        const data = await response.json();
                        // Save the result to a state for the Questions
                        setQuestions(data.results);
                    }
                    catch (error) {
                        console.error("Error fetching data:", error); 
                        // Setting any errors to be saved to a state of Error
                        setError(error);
                    }   
                    finally {
                        // Stops the Loading indicator when an error occurs
                        setLoading(false);
                }
        };
        fetchQuestions();
    }, [category, difficulty]);

    // Sets the loading message when loading
    if (loading) {
        return <p>Questions are loading...</p>;
    }

    // Sets the error message when an error occurs
    if (error) {
        return <p>Error loading questions: {error.message}</p>;
    } 

    // Ensuring there are questions
    if (!questions || questions.length === 0) {
        return <p>No questions available.</p>;
    }

    // Setting up successful return of Questions
    return (
        <div>
            <h2>Trivia Questions</h2>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question.question}</p><ul>
                        {question.incorrect_answers.concat(question.correct_answer).map((answer, index) => (
                            <li key={index}>{answer}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default QuestionForm;