import React, {} from 'react';

const Results = ({ selectedAnswers, questions, name}) => {
    const score = questions.reduce((total, question, index)=>{
        return selectedAnswers[index] === question.correct_answer ? total + 1 : total;
    }, 0);

    return (
        <div>
            <h2>{name}'s Results</h2>
            <p>You Scored: {score}/{questions.length}</p>
            {questions.map((question, index)=>(
                <div key={index}>
                    <p>{question.question}</p>
                    <p>{name}'s Answer: <strong>{selectedAnswers[index] || "No answer was selected"}</strong></p>
                    <p>Correct Answer: <strong>{question.correct_answer}</strong></p>
                </div>
            ))} <a href="HomePage.jsx">Restart</a>
        </div>
        );
};

export default Results;