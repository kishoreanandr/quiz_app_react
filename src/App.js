
import { useState } from 'react';
import './App.css';
import questionData from './questions.json';
import { useEffect } from 'react';
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(()=>
  {
      let interval;
      if(timer>0 && !showScore){
          interval =setInterval(()=>
          {
            setTimer((prevTimer)=>prevTimer-1);
          },1000);
      }
      else if(timer===0 && currentQuestion<questionData.length-1){
        setCurrentQuestion((prevQuestion)=>prevQuestion+1);
        setTimer(10);
      }
      else if(timer===0 && currentQuestion===questionData.length-1){
        setShowScore(true);
      }

      return ()=> clearInterval(interval);       
  },[timer,showScore,currentQuestion])

  const handleAnswer=(selectedOption)=>
  {
    if(selectedOption===questionData[currentQuestion].correctOption){
      setScore((prevScore)=>prevScore+1);
    }
    if(currentQuestion<questionData.length-1){
      setCurrentQuestion(currentQuestion+1);
      setTimer(10);
    }
    else{
      setShowScore(true);
    }

  }

  const handleRestartQuiz=()=>
  {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }

  return (
    
    <div className="quiz-app">
      <h1>Quiz</h1>
      {showScore ? (<div className='score-section'>
        <p>"<span>Test Over</span> – Thank You for Participation!"</p>
        <h2>Your score is: {score}/{questionData.length}</h2>
        <button onClick={handleRestartQuiz}>Restart</button>
      </div>) :

        (
          <div className='question-section'>
            <h2>Qeustion {currentQuestion+1}</h2>
            <p>{questionData[currentQuestion].question}</p>

            <div className='options'>
              {questionData[currentQuestion].options.map((Option,index)=>
              (
                  <button key={index} onClick={()=>handleAnswer(Option)}>
                    {Option}
                  </button>
              ))}
            </div>

            <div className='timer'>

              <p>Time Left: <span>{timer}</span></p>
            </div>
          </div>)}
    </div>
  );
}

export default App;
