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
          <div className="footer-title">수원쇼파천갈이영업용가정용소파</div>
          <div className="footer-details">
            인테리어쇼파공장 | 김회경 | 수원시 장안구 영화동 116-31 | 사업자등록번호: 124-51-36558 |
            전화번호: <span className="clickable" onClick={handlePhoneClick}>031-216-6469</span>
            <br />
            이메일: snsmix@naver.com | <a href="#" className="clickable">신고하기</a>
          </div>
        </div>
        <div className="social-icons">
          <img src="blog-icon.png" alt="Blog" />
          <img src="cafe-icon.png" alt="Cafe" />
          <img src="facebook-icon.png" alt="Facebook" />
          <img src="brunch-icon.png" alt="Brunch" />
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
