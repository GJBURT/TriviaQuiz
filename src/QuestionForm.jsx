import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import Results from "./Results";

const QuestionForm = ({category, difficulty, name}) => {
    // Setting up variables for Questions, Loading, and Errors
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    
    const handleAnswerChange = (questionIndex, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev, [questionIndex]: answer,
        }));
    };
    const handleSubmit = () => {
        console.log("Submitted Answers:", selectedAnswers);
        setShowResults(true);
    };
    

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
            {!showResults ? (
                <>
                <h2>{name}'s Trivia Questions</h2>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                        <p>{question.question}</p><ul>
                            {question.incorrect_answers.concat(question.correct_answer).map((answer, answerIndex) => (
                                <li key={answerIndex}>
                                    <input
                                        type="radio"
                                        name={`question-${questionIndex}`}
                                        value={answer}
                                        id={`answer-${questionIndex}-${answerIndex}`}
                                        onChange={() => handleAnswerChange(questionIndex, answer)}
                                    />
                                    <label htmlFor={`answer-${questionIndex}-${answerIndex}`}>{answer}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {/* Submit button for submitting all of the answers at once */}
                <button onClick={handleSubmit}>Submit</button>
                </> 
            ) : (
                <Results selectedAnswers={selectedAnswers} questions={questions} name={name} />)}
                
        </div>
    );
};

export default QuestionForm;