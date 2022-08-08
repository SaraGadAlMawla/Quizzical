import React from "react";
import Question from "./Question.jsx"
import './quiz.css'

const fixedUrl = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986"

function Quiz(){
    const [questions, setQuestions] = React.useState([])
    const [corrected, setCorrected] = React.useState(false)
    const [score, setScore] = React.useState(0)

    React.useEffect(callForQuestions, [])

    function callForQuestions() {
        fetch(fixedUrl)
            .then(res => res.json())
            .then(data => {
                const newQuestions = []
                for (let i = 0; i < 10; i++) {
                    newQuestions.push(generateNewQuestion(data.results[i], i))
                }
                setQuestions(newQuestions)
            })
    }

    function getRandNum(max){
        return Math.floor(Math.random()*max)
    }

    function getOptions(array){
        const len = array.length
        const indecies = []
        const res = []
        const correctAns = array[0]
        let randNum = getRandNum(len)
        while (res.length < len){
            if (indecies.includes(randNum)){
                randNum = getRandNum(len)
            }
            else{
                indecies.push(randNum)
                res.push({
                    id: randNum,
                    isCorrect: array[randNum] === correctAns? true : false,
                    isSelected: false,
                    value: decodeURIComponent(array[randNum])
                })
            }  
        }
        return res
    }

    function generateNewQuestion(res, index){
        return {
            id: index,
            value: decodeURIComponent(res.question),
            options: getOptions([res.correct_answer, ...res.incorrect_answers])
        }
    }

    function handelClick(quesId, ansId){
        setQuestions(oldQs => {
            const res = oldQs.map(q => {
                if(q.id === quesId){
                    let res = []
                    for(let i = 0; i < q.options.length; i++){
                        res = q.options.map(option => {
                            if(option.id === ansId){
                                const newOption = {...option, isSelected : !option.isSelected}
                                return newOption
                            }
                            else{
                                const newOption = {...option, isSelected : false}
                                return newOption
                            }
                        })
                    }
                    return {...q, options: res}
                }
                return q
            })
            return res
        })
    }

    function resetQuiz(){
        callForQuestions()
        setScore(0)
        setCorrected(false)
    }

    function getResult(){
        let finalScore = 0
        for(const question of questions){
            for (const option of question.options){
                if(option.isSelected ===  true && option.isCorrect === true){
                    finalScore += 1
                }
            }
        }
        setScore(finalScore)
        setCorrected(true)
    }

    function getHtmlArray(){
        const array = questions.map(
            (element)=> <Question 
            key={element.id} 
            question={element}
            corrected={corrected} 
            handelClick={handelClick}
            id={element.id}/>
        )
        return array
    }

    return (
    <div className="questions">
        {getHtmlArray()}
        <div className="results-container">
            {corrected && <p className="result">You scored {score}/10 correct answers</p>}
            <button
            className="submit-btn"
            onClick={corrected? resetQuiz : getResult}>
                {corrected? "Play again": "Check answers"}
            </button>
        </div>
    </div>)
}

export default Quiz