import React, { useState } from 'react';
import './App.css'; //드로잉 css가져오기 
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import  MessageJson  from './question.json'; //질문문항 json

import E_page from "./resultPage/Epage";
import I_page from "./resultPage/Ipage";
import Default_page from "./resultPage/Defaultpage";
/*
1. 질문 별로 선택한 질문이 MBTI 해당하는 값이 된다 
2. E/I 질문 3가지, S/N 질문 3가지 , T/F 3가지, J/P 3가지 총 12가지 문항을 선택
3. 결과를 토대로 적절한 결과를 리턴 
버튼모음사이트
https://inpa.tistory.com/entry/CSS-%F0%9F%92%8D-%EB%B2%84%ED%8A%BC-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%AA%A8%EC%9D%8C
*/


//질문문항 보여주는 메인 함수 실행  
const MBTIQuiz = () => {
  ///////////////////////////변수 선언부

  //useState 라는걸로 값을 관리할건데
  // ({}) 는 여러개 값을 () 는 1가지의 값을 관리하겟다
  const [answers, setAnswers] = useState([]); // answers배열 선언, setAnswers라는 setter 메서드로 관리 (java의 setter)
  const [currentQuestion, setCurrentQuestion] = useState(0); // currentQuestion배열 선언, setCurrentQuestion라는 메서르르 실행 
  const [bottom_quest_cnt, setAddCnt] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const navigate = useNavigate();
  
  
  //버튼을 클릭할때마다 변수에 담는 역할을 합니다 
  const handleAnswer = (answer) => {
    setFadeIn(false);
    setTimeout(() => {
      setAnswers([...answers, MessageJson[currentQuestion].answers[answer].type]); //사용자가 선택한 값을 가지고 있는 곳
      setCurrentQuestion(currentQuestion + 1);
      setAddCnt( bottom_quest_cnt+1);
      setFadeIn(true);
    }, 50); // 1000밀리초(1초) 후에 결과 표시
    
  };

  //모든 질문지를 응답했을땐 mbti를 계산
  const calculateMBTI = () => {
    let result = ''; //최종 estf 인지 estj 인지를 문자합칠겁니다 
    //3문항중 개수 많은게 대상이니까 그걸로 추려서 문자열 합칩니다
    //귀찮아서 재귀안돌림, 추후 재귀로 빼는게나음 
    //answers;
    let countI = 0;
    let countE = 0;
    let countS = 0;
    let countN = 0;
    let countT = 0;
    let countF = 0;
    let countJ = 0;
    let countP = 0;
    //배열 for문처리
    answers.forEach(answer => {
      //정규식
      countI = (answer.match(/I/g) || []).length;
      countE = (answer.match(/E/g) || []).length;
      countS = (answer.match(/S/g) || []).length;
      countN = (answer.match(/N/g) || []).length;
      countT = (answer.match(/T/g) || []).length;
      countF = (answer.match(/F/g) || []).length;
      countJ = (answer.match(/J/g) || []).length;
      countP = (answer.match(/P/g) || []).length;

    });
    //두개 카우트 합산이 0일때 비교시작
    //테스트단계에선 질문이 없어서 일단 이렇게합니다
    result += countI+countE >0 ? (countI < countE ? 'E' : 'I'):'';
    result += countS+countN >0 ? (countS < countN ? 'N' : 'S'):'';
    result += countS+countN >0 ? (countT < countF ? 'F' : 'T'):'';
    result += countS+countN >0 ? (countJ < countP ? 'P' : 'J'):'';
    

    switch (result) {
      case 'E':
        navigate('/E');
        break;
      case 'I':
        navigate('/I');
        break;
      default:
        navigate('/Default');
        break;
    }


    return result;
  };

  /* 결과값에 따른 페이지 route 지정 함수입니다 
  const switchingPage=(resultMbti) =>{
    switch(resultMbti){
      case "E":  <Route path="/" element={<E_page />} /> 
        break;
      case "I":  <Route path="/" element={<I_page />} /> 
        break;
      default : <Route path="/" element={<Default_page />} />
        break;
    }
  }*/
  
  return (
    <div className={`quiz-container ${fadeIn ? 'fade-in-out' : 'fade-in-out-hidden'}`}>
      {currentQuestion < MessageJson.length ? ( //마지막질문까지 for문 처리 
        <div className="question-container">
          
          <h1> 신중히 선택하세요 </h1>
          <h2 >{MessageJson[currentQuestion].question}</h2>
          <div>
            <button class="btn-3d red" onClick={() => handleAnswer(0)}>{MessageJson[currentQuestion].answers[0].content}</button>
          </div>  
          <div>
            <button class="btn-3d blue" onClick={() => handleAnswer(1)}>{MessageJson[currentQuestion].answers[1].content}</button>
          </div>
          <h2> 총 {MessageJson.length}가지 질문 중 {bottom_quest_cnt+1} 번째 </h2>
        </div>
        
      ) : (
        <div className="result-container">
          {/*여기서 계산하는 함수를 호출하고 완성 페이지를 호출하면된다 */}
         
          { <h2>Your MBTI Type is: {calculateMBTI()}</h2> }
          <p>Thank you for taking the test!  {MessageJson.length }</p>
          {/*페이지 전환시키기  */}
          {/* <BrowserRouter>
            <Routes>
             {switchingPage(resultMbti)}
            </Routes>
          </BrowserRouter> */}
          
          {/*카카오톡 공유ㄱ하기 버튼 */}
         
        </div>
      )}
  </div>
  
  
  );

};
  

function App() {
  const navigate = useNavigate();
  
  const handleBackToStart = () => {
    navigate('/');
  };
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<MBTIQuiz />} />
          <Route path="/E" element={<E_page />} />
          <Route path="/I" element={<I_page />} />
          <Route path="/Default" element={<Default_page />} />
        </Routes>
      </Router>
        {/*여기에 카톡 공유하기 버튼 추가 */}
        <div class="send_kakao_link">
        <button class="btn-3d blue" onClick="">카카오공유하기</button>
        
        </div>
         {/*처음으로 돌아가기*/}
        {
          <div className="back-to-start-container">
            <button class="btn-3d red"  onClick={handleBackToStart()}>
              Back to Start
            </button>
          </div>
        }
      </header>
    </div>
  );
}


export default App;
