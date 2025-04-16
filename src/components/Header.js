import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ toggleMenu }) => {
  const location = useLocation(); // 현재 경로를 가져옴

  return (
    <>
      <header className="flex justify-between p-4 border-b">
        <div className="logo">수원쇼파천갈이영업용가정용소파</div>
        <nav id="menu" className="flex space-x-4 text-sm text-gray-700">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>반갑습니다</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>소개(인사말)</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>대표상품</Link>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>쇼파갤러리</Link>
          <Link to="/map" className={location.pathname === '/map' ? 'active' : ''}>오시는길</Link>
          <Link to="/event" className={location.pathname === '/event' ? 'active' : ''}>설문이벤트</Link>
          <Link to="/coupon" className={location.pathname === '/coupon' ? 'active' : ''}>쿠폰</Link>
          <Link to="#" className="menu-link" onClick={toggleMenu}>전체보기</Link>
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>로그인</Link>
          <Link to="/signUp" className={location.pathname === '/signUp' ? 'active' : ''}>회원가입</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;