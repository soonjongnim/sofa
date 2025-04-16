import React from 'react';

const PhonePopup = ({ isOpen, onClose, phoneNumber, message}) => {
  if (!isOpen) return null;

  return (
    <div id="callModal" className="modal">
      <div className="modal-content">
        <h3 className="text-lg font-bold mb-2">전화번호</h3>
        <p className="mb-2">" 수원쇼파천갈이영업용가정용소파 " 입니다.</p>
        <p className="modal-phone">{phoneNumber}</p>
        <p className="modal-info">{message}은 모바일에서 가능합니다.</p>
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PhonePopup;
