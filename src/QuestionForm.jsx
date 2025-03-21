import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"; 

const QuestionForm = ({category, difficulty}) => {
    // Setting up variables for Questions, Loading, and Errors
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Trying to prevent duplicate API calls that is causing app to crash
    const hasFetched = useRef(false);
    
    
    
    // Fetching data from the API
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
            console.log(response)
            setQuestions(response.data.results)
        } catch (e) {
            console.log(e)
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchQuestions(); 
    }, [category, difficulty])


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