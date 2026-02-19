import React, { useState, useEffect } from 'react';
import './css/Gallery.css'; // 별도의 CSS 파일을 사용하여 스타일 적용

const allImages1 = [
  '/assets/mosahWwTWZ.jpeg',
  '/assets/mosaa83AWU.jpeg',
  '/assets/mosam5Y6uQ.jpeg',
  '/assets/mosaKpOSrM.jpeg',
  '/assets/mosabNhURI.jpeg',
  '/assets/mosamQ33QF.jpeg',
  '/assets/mosazF4vOF.jpeg', // 추가 이미지 1
  '/assets/mosaaxvMgG.jpeg', // 추가 이미지 2
];

const allImages2 = [
  '/assets/mosamQ33QF.jpeg',
  '/assets/mosaxSwbWm.jpeg',
  '/assets/mosaMcUPdh.jpeg',
  '/assets/mosaN7W45b.jpeg',
  '/assets/mosaI8Lgp7.jpeg',
  '/assets/mosa6bS362.jpeg',
  '/assets/mosakv0ojZ.jpeg',
  '/assets/mosar0yjeW.jpeg',
  '/assets/mosaHWnfMT.jpeg',
];

const Gallery = () => {
  // 첫 번째 갤러리 상태
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [fade1, setFade1] = useState(false);

  // 두 번째 갤러리 상태
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [fade2, setFade2] = useState(false);

  const visibleImages1 = allImages1.slice(0, 6); // 첫 번째 갤러리 이미지
  const visibleImages2 = allImages2.slice(0, 6); // 두 번째 갤러리 이미지

  const popupImages1 = allImages1; // 첫 번째 팝업에서는 모든 이미지 표시
  const popupImages2 = allImages2; // 두 번째 팝업에서는 모든 이미지 표시

  // 자동 슬라이드 효과
  // 첫 번째 갤러리 자동 슬라이드
  useEffect(() => {
    if (!isPopupOpen1) {
      const interval = setInterval(() => {
        setFade1(true);
        setTimeout(() => {
          setCurrentIndex1((prevIndex) => (prevIndex + 1) % visibleImages1.length);
          setFade1(false);
        }, 300); // 페이드 효과와 동일한 지속 시간
      }, 3000); // 3초마다 이미지 변경
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }
  }, [isPopupOpen1, visibleImages1.length]);

  // 두 번째 갤러리 자동 슬라이드
  useEffect(() => {
    if (!isPopupOpen2) {
      const interval = setInterval(() => {
        setFade2(true);
        setTimeout(() => {
          setCurrentIndex2((prevIndex) => (prevIndex + 1) % visibleImages2.length);
          setFade2(false);
        }, 300); // 페이드 효과와 동일한 지속 시간
      }, 3000); // 3초마다 이미지 변경
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }
  }, [isPopupOpen2, visibleImages2.length]);

  // 첫 번째 갤러리 이미지 클릭 핸들러
  const handleGalleryImageClick1 = (index) => {
    setCurrentIndex1(index);
    setIsPopupOpen1(true);
  };


  const handleGalleryThumbnailClick1 = (index) => {
    // 페이드 효과를 트리거
    setFade1(true);
    setTimeout(() => {
      setCurrentIndex1(index);
      setFade1(false); // 페이드 효과 종료
    }, 300); // CSS와 동일한 지속 시간
  };

  const handlePopupThumbnailClick1 = (index) => {
    setCurrentIndex1(index);
  };

  const handlePopupClose1 = () => {
    if (currentIndex1 >= visibleImages1.length) {
      setCurrentIndex1(0);
    }
    setIsPopupOpen1(false);
  };

  const handleNextImage1 = () => {
    setCurrentIndex1((prevIndex) => (prevIndex + 1) % popupImages1.length);
  };

  const handlePrevImage1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === 0 ? popupImages1.length - 1 : prevIndex - 1
    );
  };

  // 두 번째 갤러리 이미지 클릭 핸들러
  const handleGalleryImageClick2 = (index) => {
    setCurrentIndex2(index);
    setIsPopupOpen2(true);
  };

  const handleGalleryThumbnailClick2 = (index) => {
    // 페이드 효과를 트리거
    setFade2(true);
    setTimeout(() => {
      setCurrentIndex2(index);
      setFade2(false); // 페이드 효과 종료
    }, 300); // CSS와 동일한 지속 시간
  };

  const handlePopupThumbnailClick2 = (index) => {
    setCurrentIndex2(index);
  };

  const handlePopupClose2 = () => {
    if (currentIndex2 >= visibleImages2.length) {
      setCurrentIndex2(0);
    }
    setIsPopupOpen2(false);
  };

  const handleNextImage2 = () => {
    setCurrentIndex2((prevIndex) => (prevIndex + 1) % popupImages2.length);
  };

  const handlePrevImage2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex === 0 ? popupImages2.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">
        <span class="uio_title_bullet"></span>
        쇼파갤러리
      </h2>
      <div className="gallery-main-image">
        <img
          src={visibleImages1[currentIndex1]}
          alt={`Gallery 1 - ${currentIndex1 + 1}`}
          className={`gallery-image ${fade1 ? 'fade-out' : 'fade-in'}`} // 페이드 효과 클래스 적용
          onClick={() => handleGalleryImageClick1(currentIndex1)}
        />
      </div>
      <div className="gallery-thumbnails">
        {visibleImages1.map((image, index) => (
          <div key={index} className="thumbnail-wrapper">
            <img
              src={image}
              alt={`Thumbnail 1 - ${index + 1}`}
              className={`thumbnail ${index === currentIndex1 ? 'active' : ''}`}
              onClick={() => handleGalleryThumbnailClick1(index)}
            />
          </div>
        ))}
        <button className="more-button" onClick={() => setIsPopupOpen1(true)}>
          더보기
        </button>
      </div>

      {isPopupOpen1 && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handlePopupClose1}>
              닫기
            </button>
            <button className="prev-button" onClick={handlePrevImage1}>
              &lt;
            </button>
            <img
              src={popupImages1[currentIndex1]}
              alt={`Popup Gallery 1 - ${currentIndex1 + 1}`}
              className="popup-image"
            />
            <button className="next-button" onClick={handleNextImage1}>
              &gt;
            </button>
            <div className="popup-thumbnails">
              {popupImages1.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Popup Thumbnail 1 - ${index + 1}`}
                  className={`thumbnail ${index === currentIndex1 ? 'active' : ''}`}
                  onClick={() => handlePopupThumbnailClick1(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 두 번째 갤러리 */}
      <div className="gallery-main-image">
        <img
          src={visibleImages2[currentIndex2]}
          alt={`Gallery 2 - ${currentIndex2 + 1}`}
          className={`gallery-image ${fade2 ? 'fade-out' : 'fade-in'}`} // 페이드 효과 클래스 적용
          onClick={() => handleGalleryImageClick2(currentIndex2)}
        />
      </div>
      <div className="gallery-thumbnails">
        {visibleImages2.map((image, index) => (
          <div key={index} className="thumbnail-wrapper">
            <img
              src={image}
              alt={`Thumbnail 2 - ${index + 1}`}
              className={`thumbnail ${index === currentIndex2 ? 'active' : ''}`}
              onClick={() => handleGalleryThumbnailClick2(index)}
            />
          </div>
        ))}
        <button className="more-button" onClick={() => setIsPopupOpen2(true)}>
          더보기
        </button>
      </div>

      {isPopupOpen2 && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handlePopupClose2}>
              닫기
            </button>
            <button className="prev-button" onClick={handlePrevImage2}>
              &lt;
            </button>
            <img
              src={popupImages2[currentIndex2]}
              alt={`Popup Gallery 2 - ${currentIndex2 + 1}`}
              className="popup-image"
            />
            <button className="next-button" onClick={handleNextImage2}>
              &gt;
            </button>
            <div className="popup-thumbnails">
              {popupImages2.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Popup Thumbnail 2 - ${index + 1}`}
                  className={`thumbnail ${index === currentIndex2 ? 'active' : ''}`}
                  onClick={() => handlePopupThumbnailClick2(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;