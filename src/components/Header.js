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

  const isApp = /SOFA_APP/i.test(navigator.userAgent);

  return (
    <>
      <header className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-purple-600">수원쇼파천갈이</Link>
        <div className="flex items-center">
          {/* 웹이거나 앱의 데스크톱 뷰일 때 메뉴 노출 */}
          <nav id="menu" className={`${isApp ? 'hidden md:flex' : 'flex'} flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700 mr-4`}>
            <Link to="/" className={location.pathname === '/' ? 'text-purple-600 font-bold' : ''}>반갑습니다</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'text-purple-600 font-bold' : ''}>소개(인사말)</Link>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'text-purple-600 font-bold' : ''}>쇼파갤러리</Link>
            <Link to="/map" className={location.pathname === '/map' ? 'text-purple-600 font-bold' : ''}>오시는길</Link>
            {user ? (
              <button onClick={handleLogout} className="text-red-500">로그아웃</button>
            ) : (
              <Link to="/login" className={location.pathname === '/login' ? 'text-purple-600 font-bold' : ''}>로그인</Link>
            )}
          </nav>

          {/* 앱일 때만 햄버거 버튼 노출 */}
          {isApp && (
            <button
              className="p-2 focus:outline-none md:hidden"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;