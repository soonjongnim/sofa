import React from 'react';
import './css/About.css'; // 별도의 CSS 파일을 사용하여 스타일 적용

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">
        <span class="uio_title_bullet"></span>
        소개(인사말)
      </h2>
      <h3 className="about-subtitle">
        쇼파제작 거실인테리어 업소용, 영업용, 가정용, 불박이 모두 OK 진영쇼파
      </h3>
      <div className="about-image-container">
        <img
          src="/assets/sofa-about.jpg" // 이미지 경로를 실제 파일 경로로 변경
          alt="쇼파제작 거실인테리어"
          className="about-image"
        />
      </div>
      <p className="about-description">
        소중한, 특별한 하나뿐인 쇼파
      </p>
      <div class="line"></div>
      <p className="about-details">
        <h4>
          20년 동안 쇼파만을 만든 장인이 직접 제작하는 고품격 HANDMADE
        </h4>
        맞춤형 모든 쇼파제작의 NO.1.
        <br />
        서울 경기 수도권 모두 OK
      </p>
    </div>
  );
};

export default About;