import React from 'react';
import resultImage from './resultPageImg/test.png'; // 결과화면
import './I_page.css'; // Import your custom CSS file for styling

function I_page() {
  return (
    <div className="result-container">
      {/* 큰 이미지 추가 */}
      
      <img src={resultImage} alt="resultI" className="result-image" />


      {/* 특정 링크 추가 */}
      <div className="coupang-container">
        {/* Coupang link */}
        <a
          className="coupang-link"
          href="https://link.coupang.com/a/bkj5MR"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Coupang
        </a>

        {/* Product image for Coupang link */}
        <img
          src="https://imageURLForYourProduct"  // Replace this with the actual URL of your product image
          alt="CoupangProduct"
          className="product-image"
        />
      </div>

    </div>
  );
}

export default I_page;