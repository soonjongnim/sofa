import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅 사용
import PhonePopup from './PhonePopup'; // 전화 팝업 컴포넌트

const HomeSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ phoneNumber: '', message: '' });
  const navigate = useNavigate();

  const handleTextInquiry = () => {
    setPopupData({
      phoneNumber: '6341-6469',
      message: '문자연결',
    });
    setShowPopup(true);
  };

  const handleCall = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = 'tel:01097308087';
    } else {
      setPopupData({
        phoneNumber: '031-216-6469',
        message: '전화연결',
      });
      setShowPopup(true);
    }
  };

  const handleQuickConsultation = () => {
    setPopupData({
      phoneNumber: '010-9730-8087',
      message: '전화연결',
    });
    setShowPopup(true);
  };

  const goToGallery = () => {
    navigate('/gallery'); // 쇼파갤러리 페이지로 이동
  };

  const goToMap = () => {
    navigate('/map'); // 오시는길 페이지로 이동
  };

  return (
    <div className="home-section">
      <div className="image-container">
        <img
          src="/assets/sofa-image.jpg" // 이미지 경로를 실제 이미지 파일로 변경하세요.
          alt="영업용가정용 쇼파"
          className="home-image"
        />
        <div className="overlay">
          <h1>영업용가정용 쇼파제작의 달인</h1>
          <p>인테리어 업소용 가정용 불박이 인테리어 맞춤형 쇼파 제작</p>
        </div>
      </div>
      <div className="button-container">
        <button className="action-button" onClick={goToGallery}>
          🛋 쇼파구경하기
        </button>
        <button className="action-button" onClick={goToMap}>
          🚗 오시는길
        </button>
        <button className="action-button" onClick={handleQuickConsultation}>
          💬 빠른상담
        </button>
      </div>
      <div className="contact-container">
        <button className="contact-button" onClick={handleTextInquiry}>
          ✉️ 문자로 문의하기
        </button>
      </div>
      <div className="contact-container">
        <button className="contact-button" onClick={handleCall}>
          📞 매장으로 연결하기
        </button>
      </div>
      {/* 전화 팝업 */}
      <PhonePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        phoneNumber={popupData.phoneNumber}
        message={popupData.message}
      />
    </div>
  );
};

export default HomeSection;