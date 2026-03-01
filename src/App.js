import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Map from './pages/Map';
import Event from './pages/Event';
import Coupon from './pages/Coupon';
import Login from './pages/Login';
import './pages/css/App.css'; // CSS 파일 추가
import SideMenu from './components/SideMenu';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import DeviceInfo from './pages/DeviceInfo';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 사이드 메뉴 상태

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 메뉴 열기/닫기 상태 토글
  };

  return (
    <UserProvider>
      <Router>
        <div
          className={`min-h-screen flex flex-col ${isMenuOpen ? 'menu-open' : ''
            }`} // 메뉴 열림 상태에 따라 클래스 추가
        >
          <Header toggleMenu={toggleMenu} /> {/* toggleMenu를 Header에 전달 */}
          <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/map" element={<Map />} />
              <Route path="/event" element={<Event />} />
              <Route path="/coupon" element={<Coupon />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/device-info" element={<DeviceInfo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;