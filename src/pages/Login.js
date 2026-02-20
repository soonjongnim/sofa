import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // UserContext 가져오기
import "./css/SignUp.css";

const Login = () => {
  const { setUser } = useContext(UserContext); // Context에서 setUser 가져오기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://soon9086postgresserver.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // 로그인 성공
        alert("로그인 성공!");
        console.log("로그인된 사용자 정보:", result.user);

        // 사용자 정보를 Context와 sessionStorage에 저장
        setUser(result.user);
        sessionStorage.setItem("user", JSON.stringify(result.user));

        // 홈 페이지로 이동
        navigate("/");
      } else {
        // 로그인 실패
        alert(result.error || "로그인 실패");
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="useremail">이메일</label>
          <input
            id="useremail"
            type="text"
            placeholder="example@email.com"
            {...register("useremail", {
              required: "이메일은 필수 입력입니다.",
              validate: (value) =>
                value === "admin" || /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(value) ||
                "이메일 형식에 맞지 않습니다.",
            })}
          />
          {errors.useremail && <small role="alert">{errors.useremail.message}</small>}
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

        {/* 제출 버튼 */}
        <button type="submit" className="signup-button">
          로그인
        </button>

        {/* 회원가입 버튼 */}
        <button
          type="button"
          className="login-signup-button"
          onClick={() => navigate("/signup")}
          style={{
            marginTop: '10px',
            backgroundColor: '#fff',
            color: '#9c73b1',
            border: '1px solid #9c73b1'
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Login;


