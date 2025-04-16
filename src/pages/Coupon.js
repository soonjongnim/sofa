import React from 'react';
import './css/Coupon.css'; // 스타일 파일 추가

const Coupon = () => {
  return (
    <div className="coupon-container">
      <h2 className="coupon-title">
        <span class="uio_title_bullet"></span>
        쿠폰
      </h2>
      <div className="coupon-card-container">
        <div className="coupon-card-box">
          <div className="coupon-card">
            <h2 className="coupon-highlight">무료</h2>
            <p className="coupon-description">
              쇼파주문하면 핸드메이드<br />
              디자인 쿠션이 무료!
            </p>
          </div>
          <ul className="coupon-notes">
            <li>쿠폰은 모바일에서 사용할 수 있습니다.</li>
            <li>1주문 시 1장 사용 가능</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coupon;