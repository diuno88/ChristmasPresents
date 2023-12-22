
import React  from 'react';
import resultImage from './resultPageImg/test.png'; // 결과화면
import './resultPage.css'; // Import your custom CSS file for styling

function I_page() {
  
  return (
    <div className="result-container" id="holder">
      {/* 큰 이미지 추가 */}
      <div className='resultImage'>
        <img src={resultImage} alt="resultI"/>
      </div>
      
      {/* 특정 링크 추가 */}
      <div className="coupangLink">
        {/* Coupang link */}
        추천선물
        <a href="https://link.coupang.com/a/bkj5MR"/>
      </div>
    </div>
  );
}

export default I_page;