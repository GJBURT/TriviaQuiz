import React, { useState, useEffect } from 'react';

const QuestionForm = () => {
    // Setting up variables for Questions, Loading, and Errors
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data from the API
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&type=multiple')
            // Converting the response to json
            .then((response) => response.json())
            .then((data) => {
                // Save the result to a state for the Questions
                setQuestions(data.results); 
                // Making the Loading indicator stop
                setLoading(false);
            })
            .catch((error) => {
                // Setting any errors to be saved to a state of Error
                setError(error);
                // Stops the Loading indicator when an error occurs
                setLoading(false);
            });
    },
    // Empty array set for the API call to happen once the component runs 
    []);

    // Sets the loading message when loading
    if (loading) {
        return <p>Questions are loading...</p>;
    }

    // Sets the error message when an error occurs
    if (error) {
        return <p>Error loading questions: {error.message}</p>;
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