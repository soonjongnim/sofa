import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./css/SignUp.css"; // 스타일 파일 추가

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isUsernameChecked, setIsUsernameChecked] = useState(false); // 아이디 중복 확인 상태
  const [usernameError, setUsernameError] = useState(""); // 중복 확인 에러 메시지

  const onSubmit = (data) => {
    if (!isUsernameChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    console.log("회원가입 데이터:", data);
    alert("회원가입이 완료되었습니다!");
  };

  const checkUsername = () => {
    const username = document.getElementById("username").value;

    if (!username) {
      setUsernameError("아이디를 입력해주세요.");
      return;
    }

    // 중복 확인 로직 (예: 서버 요청)
    // 여기서는 간단히 "testuser"가 중복된 아이디라고 가정
    if (username === "testuser") {
      setUsernameError("이미 사용 중인 아이디입니다.");
      setIsUsernameChecked(false);
    } else {
      setUsernameError("");
      setIsUsernameChecked(true);
      alert("사용 가능한 아이디입니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {/* 아이디 입력 */}
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <div className="username-container">
            <input
              id="username"
              type="text"
              placeholder="아이디를 입력하세요"
              {...register("username", {
                required: "아이디는 필수 입력입니다.",
                minLength: {
                  value: 5,
                  message: "아이디는 최소 5자리 이상이어야 합니다.",
                },
              })}
            />
            <button
              type="button"
              className="check-button"
              onClick={checkUsername}
            >
              중복확인
            </button>
          </div>
          {errors.username && (
            <small role="alert">{errors.username.message}</small>
          )}
          {usernameError && <small role="alert">{usernameError}</small>}
        </div>

        {/* 이름 입력 */}
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            placeholder="홍길동"
            {...register("name", { required: "이름은 필수 입력입니다." })}
          />
          {errors.name && <small role="alert">{errors.name.message}</small>}
        </div>

        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </div>

        {/* 전화번호 입력 */}
        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            id="phone"
            type="tel"
            placeholder="010-1234-5678"
            {...register("phone", {
              required: "전화번호는 필수 입력입니다.",
              pattern: {
                value: /^01[0-9]-\d{3,4}-\d{4}$/,
                message: "전화번호 형식에 맞지 않습니다. (예: 010-1234-5678)",
              },
            })}
          />
          {errors.phone && <small role="alert">{errors.phone.message}</small>}
        </div>

        {/* 비밀번호 입력 */}
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자리 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            {...register("confirmPassword", {
              required: "비밀번호 확인은 필수 입력입니다.",
              validate: (value) =>
                value ===
                  document.getElementById("password").value ||
                "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.confirmPassword && (
            <small role="alert">{errors.confirmPassword.message}</small>
          )}
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;