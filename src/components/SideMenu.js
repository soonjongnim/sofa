import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/css/SideMenu.css'; // 스타일 파일 추가

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <div className="side-menu-header">
        <h2>수원쇼파천갈이영업용가정용소파</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <ul className="side-menu-list">
        <li><Link to="/" onClick={onClose}>반갑습니다</Link></li>
        <li><Link to="/about" onClick={onClose}>소개(인사말)</Link></li>
        <li><Link to="/products" onClick={onClose}>대표상품</Link></li>
        <li><Link to="/gallery" onClick={onClose}>쇼파갤러리</Link></li>
        <li><Link to="/map" onClick={onClose}>오시는길</Link></li>
        <li><Link to="/event" onClick={onClose}>설문이벤트</Link></li>
        <li><Link to="/coupon" onClick={onClose}>쿠폰</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;