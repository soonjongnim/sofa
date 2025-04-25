import React, { useState } from 'react';
import PhonePopup from './PhonePopup';

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ phoneNumber: '', message: '' });

  const handlePhoneClick = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = "tel:01097308087";
    } else {
      setPopupData({
        phoneNumber: '010-9730-8087',
        message: '전화연결',
      });
      setShowPopup(true);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <div className="footer-title">
            <a
              href="https://search.naver.com/search.naver?ie=UTF-8&query=%EC%88%98%EC%9B%90%EC%87%BC%ED%8C%8C%EC%B2%9C%EA%B0%88%EC%9D%B4%EC%98%81%EC%97%85%EC%9A%A9%EA%B0%80%EC%A0%95%EC%9A%A9%EC%86%8C%ED%8C%8C%40"
              target="_blank"
              rel="noopener noreferrer"
            >
              수원쇼파천갈이영업용가정용소파@
            </a>
          </div>
          <div className="footer-details">
            인테리어쇼파공장 | 김회경 | 수원시 장안구 영화동 116-31 | 사업자등록번호: 124-51-36558 |
            전화번호: <span className="clickable" onClick={handlePhoneClick}>031-216-6469</span>
            <br />
            이메일: snsmix@naver.com | <a href="#" className="clickable">신고하기</a>
          </div>
        </div>
        <div className="social-icons">
          <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer">
            <img src="assets/blog-icon.png" className="nicon_blog" alt="Blog" />
          </a>
          <a href="https://cafe.naver.com" target="_blank" rel="noopener noreferrer">
            <img src="assets/cafe-icon.png" alt="Cafe" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="assets/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://brunch.co.kr" target="_blank" rel="noopener noreferrer">
            <img src="assets/brunch-icon.png" alt="Brunch" />
          </a>
        </div>
      </div>

      {/* 전화 버튼 */}
      <button
        onClick={handlePhoneClick}
        className="call-btn"
      >
        ☎
      </button>

      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="top-btn"
      >
        ↑<br />TOP
      </button>

      {/* 전화 팝업 */}
      <PhonePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        phoneNumber={popupData.phoneNumber}
        message={popupData.message}
      />
    </footer>
  );
};

export default Footer;
