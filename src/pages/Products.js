import React, { useState } from 'react';
import './css/Products.css'; // 별도의 CSS 파일을 사용하여 스타일 적용
import PhonePopup from '../components/PhonePopup'; // 전화 팝업 컴포넌트

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCall = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = 'tel:01097308087';
    } else {
      console.log('PC에서는 전화 연결이 불가능합니다.');
      setShowPopup(true);
    }
  };

  return (
    <div className="products-container">
      <h2 className="products-title">
        <span class="uio_title_bullet"></span>
        대표상품
      </h2>
      <div className="products-image-container">
        <img
          src="/assets/sofa-product.jpg" // 이미지 경로를 실제 파일 경로로 변경
          alt="대표상품: 맞춤형 불박이쇼파"
          className="products-image"
        />
      </div>
      <p className="products-description">
        대표상품: 맞춤형 붙박이쇼파
      </p>
      <ul className="products-details">
        <li>1. 고객님의 요청에 따른 꿈꾸던 쇼파</li>
        <li>2. 서울, 경기의 경험도 품질도 NO1</li>
        <li>3. 기존에 쓰던것을 천갈이 리폼도 OK</li>
        <li>4. 업소에도 가정에도 고객의니즈 정복</li>
        <li>5. 특별하고 안락한 거실인테리어의 완성</li>
      </ul>
      <div className="products-contact">
        <button className="contact-button" onClick={handleCall}>
          📞 친절한 상담을 약속 - 바로연결하기
        </button>
      </div>
      {/* 전화 팝업 */}
      <PhonePopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>

  );
};

export default Products;