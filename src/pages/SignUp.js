import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 가져오기
import { UserContext } from "../context/UserContext"; // UserContext 가져오기
import "./css/SignUp.css"; // 스타일 파일 추가

const SignUp = () => {
  const { setUser } = useContext(UserContext); // Context에서 setUser 가져오기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // useNavigate 초기화
  const [isUseremailChecked, setIsUseremailChecked] = useState(false); // 아이디 중복 확인 상태
  const [useremailError, setUseremailError] = useState(""); // 중복 확인 에러 메시지

  const onSubmit = async (data) => {
    try {
      if (!isUseremailChecked) {
        alert("이메일 중복 확인을 해주세요.");
        return;
      }

      const response = await fetch('https://soon9086postgresserver.vercel.app/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        console.log("회원가입 데이터:", data);
        console.log("회원가입이 완료되었습니다!");
        // 사용자 정보를 Context와 sessionStorage에 저장
        setUser(result.user);
        sessionStorage.setItem("user", JSON.stringify(result.user));

        // 홈 페이지로 이동
        navigate('/'); // React Router의 navigate 사용
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const checkUseremail = async () => {
    const useremail = document.getElementById("useremail").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!useremail) {
      setUseremailError("이메일을 입력해주세요.");
      return;
    }

    if (!emailRegex.test(useremail)) {
      setUseremailError("이메일 형식에 맞지 않습니다.");
      return;
    } else {
      setUseremailError("");
    }


    try {
      // 서버로 이메일 중복 확인 요청
      const response = await fetch(`https://soon9086postgresserver.vercel.app/api/checkUserEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useremail }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.exists) {
          setUseremailError("이미 사용 중인 이메일입니다.");
          setIsUseremailChecked(false);
        } else {
          setUseremailError("");
          setIsUseremailChecked(true);
          alert("사용 가능한 이메일입니다.");
        }
      } else {
        setUseremailError("이메일 중복 확인 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setUseremailError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="useremail">이메일</label>
          <div className="useremail-container">
            <input
              id="useremail"
              type="email"
              placeholder="example@email.com"
              {...register("useremail", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <button
              type="button"
              className="check-button"
              onClick={checkUseremail}
            >
              중복확인
            </button>
          </div>
          {errors.useremail && (
            <small role="alert">{errors.useremail.message}</small>
          )}
          {useremailError && <small role="alert">{useremailError}</small>}
        </div>

        {/* 이름 입력 */}
        <div className="form-group">
          <label htmlFor="username">이름</label>
          <input
            id="username"
            type="text"
            placeholder="홍길동"
            {...register("username", { required: "이름은 필수 입력입니다." })}
          />
          {errors.username && <small role="alert">{errors.username.message}</small>}
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