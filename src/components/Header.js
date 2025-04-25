import React, { useContext, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Header = ({ toggleMenu }) => {
  const location = useLocation(); // 현재 경로를 가져옴
  const { user, setUser } = useContext(UserContext);

  // 세션 만료 시간 (1시간 = 3600000ms)
  const SESSION_TIMEOUT = 3600000;

  // 애플리케이션 로드 시 세션 스토리지에서 사용자 정보 로드
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const lastActivity = sessionStorage.getItem("lastActivity");

    if (storedUser) {
      const currentTime = new Date().getTime();
      if (lastActivity && currentTime - lastActivity > SESSION_TIMEOUT) {
        // 세션 만료
        handleLogout();
      } else {
        setUser(JSON.parse(storedUser)); // 세션 스토리지에서 가져온 사용자 정보를 상태에 설정
        sessionStorage.setItem("lastActivity", currentTime); // 마지막 활동 시간 갱신
      }
    }
  }, [setUser]);

  // 사용자 활동 시 마지막 활동 시간 갱신
  useEffect(() => {
    const updateLastActivity = () => {
      sessionStorage.setItem("lastActivity", new Date().getTime());
    };

    window.addEventListener("mousemove", updateLastActivity); // 마우스 움직임 감지
    window.addEventListener("keydown", updateLastActivity); // 키보드 입력 감지

    return () => {
      window.removeEventListener("mousemove", updateLastActivity);
      window.removeEventListener("keydown", updateLastActivity);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("lastActivity");
    setUser(null);
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
  };

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
          {user ? (
            <>
              <span className="text-blue-500">안녕하세요, {user.username}님!</span>
              <button onClick={handleLogout} className="text-red-500 ml-4">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>로그인</Link>
              <Link to="/signUp" className={location.pathname === '/signUp' ? 'active' : ''}>회원가입</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;