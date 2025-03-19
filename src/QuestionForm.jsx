import React, { useState, useEffect, useRef } from 'react';

const QuestionForm = ({category, difficulty}) => {
    // Setting up variables for Questions, Loading, and Errors
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Trying to prevent duplicate API calls that is causing app to crash
    const hasFetched = useRef(false);
    
    // Fetching data from the API
    useEffect(() => {
        // log for debugging
        console.log("Category:", category, "Difficulty:", difficulty);
        // Making sure there are valid inputs
        if (!category || !difficulty) return;

        let isMounted = true; 

        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                    console.log("Fetching questions...");
                    // Adding a 1 second delay before the API request
                    await new Promise((resolve) => setTimeout(resolve, 2500));
                    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
                        // Converting the response to json
                        if (!response.ok) {
                            throw new Error (`HTTP error! Status: ${response.status}`);
                        }
                        const data = await response.json();
                        // log for debugging
                        console.log("Fetched data:", data);

                        // Save the result to a state for the Questions
                        if (isMounted) {
                            setQuestions(data.results);
                            hasFetched.current = true; }
                    }
                    catch (error) {
                        console.error("Error fetching data:", error); 
                        // Setting any errors to be saved to a state of Error
                        if (isMounted) {
                            setError(error); }
                    }   
                    finally {
                        // Stops the Loading indicator when an error occurs
                        if (isMounted) {
                            setLoading(false); }
                }
        };
        fetchQuestions();

        return () => {
            isMounted = false;
        }
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