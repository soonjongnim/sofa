import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // UserContext 가져오기
import dayjs from 'dayjs';
import "./css/Event.css"; // 스타일 파일을 별도로 작성

const Event = () => {
  const [activeTab, setActiveTab] = useState("survey"); // 현재 활성화된 탭 상태
  const [inquiries, setInquiries] = useState([]); // 나의 문의/신청 내역 데이터
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 선택된 문의 데이터
  const [title, setTitle] = useState(""); // 설문 이벤트 제목 상태 추가
  const [details, setDetails] = useState(""); // 하고싶은말이나 기타문의 내용
  const [filePreview, setFilePreview] = useState([]); // 업로드된 파일 미리보기
  const [selectedAll, setSelectedAll] = useState(false); // 전체 선택 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [totalCount, setTotalCount] = useState(1); // 전체 데이터 수
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글 내용
  const itemsPerPage = 10; // 페이지당 항목 수
  const { user } = useContext(UserContext); // 사용자 정보 가져오기
  const navigate = useNavigate();

  // const baseUrl = process.env.BASE_URL;
  // console.log(`서버가 ${baseUrl} 포트에서 실행 중입니다.`);

  const fetchInquiries = async (page = 1, searchTerm = "") => {
    try {
      const response = await fetch(
        `https://soon9086postgresserver.vercel.app/api/event?page=${page}&itemsPerPage=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}&useremail=${encodeURIComponent(user.useremail)}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log("Fetched inquiries:", result.events);
        setInquiries(result.events); // 문의 내역 상태 업데이트
        setCurrentPage(result.currentPage); // 현재 페이지 업데이트
        setTotalPages(result.totalPages); // 전체 페이지 수 업데이트
        setTotalCount(result.totalCount); // 전체 데이터 개수 업데이트
      } else {
        console.error("Failed to fetch inquiries:", result.error);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const fetchComments = async (eventId) => {
    try {
      const response = await fetch(`https://soon9086postgresserver.vercel.app/api/comment?eventId=${eventId}`, {
        method: "GET",
      });
      const result = await response.json();
      if (response.ok) {
        return result.comments; // 댓글 목록 반환
      } else {
        console.error("Failed to fetch comments:", result.error);
        return [];
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const handleInquirySelect = async (inquiry) => {
    const comments = await fetchComments(inquiry.id); // 댓글 목록 가져오기
    setSelectedInquiry({
      ...inquiry,
      comments, // 댓글 목록 추가
    });
  };

  const handlePageChange = async (pageNumber) => {
    await fetchInquiries(pageNumber, searchTerm); // 현재 검색어와 함께 페이지 변경
  };

  // 삭제 로직을 별도의 함수로 분리
  const deleteInquiries = async (ids) => {
    if (!ids || ids.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    const confirmed = window.confirm("선택된 항목을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await fetch("https://soon9086postgresserver.vercel.app/api/eventDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }), // 삭제할 ID 배열을 서버로 전송
      });

      const result = await response.json();
      if (response.ok) {
        alert("선택된 항목이 삭제되었습니다.");
        // 삭제된 항목을 제외한 나머지 항목으로 상태 업데이트
        setInquiries((prevInquiries) =>
          prevInquiries.filter((inquiry) => !ids.includes(inquiry.id))
        );
        setSelectedInquiry(null); // 상세 보기에서 목록으로 돌아가기
      } else {
        alert("삭제에 실패했습니다.");
        console.error("Failed to delete inquiries:", result.error);
      }
    } catch (error) {
      console.error("Error deleting inquiries:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  // 선택된 항목 삭제 함수
  const deleteSelected = async () => {
    const selectedIds = inquiries
      .filter((inquiry) => inquiry.isSelected) // 선택된 항목 필터링
      .map((inquiry) => inquiry.id); // 선택된 항목의 ID 배열 생성

    await deleteInquiries(selectedIds); // 삭제 로직 호출
  };

  // 상세 페이지에서 삭제 버튼 연결
  const deleteCurrentInquiry = async () => {
    if (selectedInquiry) {
      await deleteInquiries([selectedInquiry.id]); // 단일 ID를 배열로 전달
    }
  };

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll); // 전체 선택 상태 토글
    setInquiries((prevInquiries) =>
      prevInquiries.map((inquiry) => ({
        ...inquiry,
        isSelected: !selectedAll, // 모든 항목의 선택 상태를 변경
      }))
    );
  };

  const handleSelect = (id) => {
    setInquiries((prevInquiries) =>
      prevInquiries.map((inquiry) =>
        inquiry.id === id
          ? { ...inquiry, isSelected: !inquiry.isSelected } // 선택 상태 토글
          : inquiry
      )
    );
  };

  const handleTabClick = async (tab) => {
    if (tab === "inquiries" && !user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      setActiveTab(tab);
      if (tab === "inquiries") {
        await fetchInquiries();
      } else if (tab === "survey") {
        setTitle(""); // 제목 초기화
        setDetails(""); // 내용 초기화
        setFilePreview([]); // 파일 미리보기 초기화
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // 업로드된 파일 배열
    const maxFiles = 5; // 최대 파일 개수
    const maxTotalSize = 50 * 1024 * 1024; // 최대 총 용량 (50MB)
    let totalSize = 0;

    // 기존 파일과 새로 추가된 파일을 합침
    const updatedFiles = [...filePreview, ...files];

    // 파일 개수 제한
    if (updatedFiles.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    // 총 용량 계산
    updatedFiles.forEach((file) => {
      totalSize += file.size;
    });

    if (totalSize > maxTotalSize) {
      alert("업로드된 파일의 총 용량은 50MB를 초과할 수 없습니다.");
      return;
    }

    // 파일 미리보기 URL 생성
    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result); // 미리보기 URL 추가
        if (newPreviews.length === files.length) {
          // 모든 파일의 URL이 생성된 후에만 상태 업데이트
          setFilePreview((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileRemove = (index) => {
    setFilePreview((prev) => prev.filter((_, i) => i !== index)); // 선택된 파일 삭제
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!title.trim()) {
      alert("제목은 필수 입력입니다.");
      return;
    }

    // 필수 입력 체크: 하고싶은말이나 기타문의
    if (!details.trim()) {
      alert("하고싶은말이나 기타문의는 필수 입력입니다.");
      return;
    }

    // 필수 체크박스 확인: 전하실 말을 완성할 경로
    const paths = Array.from(e.target.querySelectorAll('input[name="paths"]:checked')).map(
      (input) => input.value
    );
    if (paths.length === 0) {
      alert("전하실 말을 완성할 경로를 하나 이상 선택해주세요.");
      return;
    }

    // 필수 체크박스 확인: 상담하고 싶은 메뉴
    const menus = Array.from(e.target.querySelectorAll('input[name="menus"]:checked')).map(
      (input) => input.value
    );
    if (menus.length === 0) {
      alert("상담하고 싶은 메뉴를 하나 이상 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);  // 제목 추가
    formData.append("details", details);  // 내용 추가

    // 파일 데이터를 FormData에 추가
    filePreview.forEach((file, index) => {
      const blob = dataURLtoBlob(file); // Data URL을 Blob으로 변환
      formData.append(`file_${index}`, blob, `file_${index}.jpg`); // 파일명과 Blob 추가
    });

    formData.append("paths", JSON.stringify(paths));
    formData.append("menus", JSON.stringify(menus));
    formData.append("userEmail", user.useremail);

    try {
      const response = await fetch("https://soon9086postgresserver.vercel.app/api/event", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("등록이 완료되었습니다.");
        console.log("Event created:", result);
        await fetchInquiries();
        setActiveTab("inquiries");
      } else {
        alert("등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleSearch = async () => {
    await fetchInquiries(1, searchTerm); // 검색어와 함께 첫 페이지 데이터 가져오기
  };

  const handleCommentSubmit = async (eventId, content) => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("https://soon9086postgresserver.vercel.app/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          username: user.username, // 현재 로그인한 사용자 이름
          useremail: user.useremail, // 현재 로그인한 사용자 이메일
          content,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("댓글이 등록되었습니다.");
        // 댓글 목록을 다시 가져오거나 상태를 업데이트
        console.log("result.comment submitted:", result.comment);
        const updatedComments = await fetchComments(eventId);
        setSelectedInquiry((prev) => ({
          ...prev,
          comments: updatedComments, // 댓글 목록 업데이트
        }));
        document.querySelector(".comment-input").value = ""; // 입력값 초기화
        console.log('selectedInquiry: ', selectedInquiry);
      } else {
        alert("댓글 등록에 실패했습니다.");
        console.error("Failed to submit comment:", result.error);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleCommentDelete = async (commentId, eventId) => {
    const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmed) return;
    console.log('commentId: ', commentId);
    try {
      const response = await fetch(`https://soon9086postgresserver.vercel.app/api/comment?commentId=${commentId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("댓글이 삭제되었습니다.");
        // 댓글 목록을 다시 가져오거나 상태를 업데이트
        const updatedComments = await fetchComments(eventId);
        setSelectedInquiry((prev) => ({
          ...prev,
          comments: updatedComments, // 댓글 목록 업데이트
        }));
      } else {
        const result = await response.json();
        alert("댓글 삭제에 실패했습니다.");
        console.error("Failed to delete comment:", result.error);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId); // 수정 중인 댓글 ID 설정
    setEditingContent(content); // 수정 중인 댓글 내용 설정
  };

  const handleEditCancel = () => {
    setEditingCommentId(null); // 수정 중인 댓글 ID 초기화
    setEditingContent(""); // 수정 중인 댓글 내용 초기화
  };

  const handleEditSave = async (commentId, eventId) => {
    if (!editingContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`https://soon9086postgresserver.vercel.app/api/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId: commentId, content: editingContent }),
      });

      if (response.ok) {
        alert("댓글이 수정되었습니다.");
        const updatedComments = await fetchComments(eventId); // 댓글 목록 다시 가져오기
        setSelectedInquiry((prev) => ({
          ...prev,
          comments: updatedComments, // 댓글 목록 업데이트
        }));
        handleEditCancel(); // 수정 상태 초기화
      } else {
        const result = await response.json();
        alert("댓글 수정에 실패했습니다.");
        console.error("Failed to edit comment:", result.error);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  return (
    <div className="event-container">
      <div className="event-tabs">
        <a
          className={`tab ${activeTab === "survey" ? "active" : ""}`}
          onClick={() => handleTabClick("survey")}
        >
          설문이벤트
        </a>
        <a
          className={`tab ${activeTab === "inquiries" ? "active" : ""}`}
          onClick={() => handleTabClick("inquiries")}
        >
          나의 문의/신청 내역
        </a>
      </div>
      <div className="event-content">
        {activeTab === "survey" && (
          <>
            <ul className="event-description">
              <li>설문과 주문상담 페이지입니다.</li>
              <li>내용을 접수하시면 연락드립니다.</li>
            </ul>
            <form className="event-form" onSubmit={handleSubmit}>
              {user && (
                <div className="form-group">
                  <label htmlFor="contact" className="required">글쓴이</label>
                  {user.username}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="title" className="required">제목</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
                />
              </div>
              <div className="form-group">
                <label htmlFor="details" className="required">하고싶은말이나 기타문의</label>
                <textarea
                  id="details"
                  name="details"
                  placeholder="내용을 입력해주세요."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="file">사진등록 (최대 5개, 총 50MB)</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  multiple
                  onChange={handleFileChange}
                />
                <div className="file-preview-container">
                  {filePreview.map((preview, index) => (
                    <div
                      key={index}
                      className="file-preview"
                      onClick={() => handleFileRemove(index)} // 클릭 시 파일 삭제
                    >
                      <img
                        src={preview}
                        alt={`미리보기 ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="required">전하실 말을 완성할 경로</label>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" name="paths" value="온라인광고" /> 온라인광고
                  </label>
                  <label>
                    <input type="checkbox" name="paths" value="자연낙서" /> 자연낙서
                  </label>
                  <label>
                    <input type="checkbox" name="paths" value="오프라인배광" /> 오프라인배광
                  </label>
                  <label>
                    <input type="checkbox" name="paths" value="오프라인광고" /> 오프라인광고
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="required">상담하고 싶은 메뉴</label>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" name="menus" value="영업용쇼파" /> 영업용쇼파
                  </label>
                  <label>
                    <input type="checkbox" name="menus" value="가정용쇼파" /> 가정용쇼파
                  </label>
                  <label>
                    <input type="checkbox" name="menus" value="쇼파리폼" /> 쇼파리폼
                  </label>
                  <label>
                    <input type="checkbox" name="menus" value="맞춤형쇼파제작" /> 맞춤형쇼파제작
                  </label>
                </div>
              </div>
              <div className="form-buttons">
                <button type="button" className="cancel-button">취소</button>
                <button type="submit" className="submit-button">등록</button>
              </div>
            </form>
          </>
        )}
        {activeTab === "inquiries" && (
          <div className="inquiries-content">
            {selectedInquiry ? (
              <div className="inquiry-detail">
                <h3>{selectedInquiry.username}님의 문의/신청 내역입니다.</h3>
                <p className="inquiry-date">
                  {new Date(selectedInquiry.created_at).toLocaleDateString()}
                </p>
                <table className="inquiry-table">
                  <tbody>
                    <tr>
                      <th>연락처</th>
                      <td>{selectedInquiry.userphone}</td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td>{selectedInquiry.username}</td>
                    </tr>
                    <tr>
                      <th>제목</th>
                      <td>{selectedInquiry.title}</td> {/* 제목 필드 추가 */}
                    </tr>
                    <tr>
                      <th>하고싶은말이나 기타질문</th>
                      <td>{selectedInquiry.details}</td>
                    </tr>
                    <tr>
                      <th>진행쇼파를 알게된 경로</th>
                      <td>{selectedInquiry.paths.join(" / ")}</td>
                    </tr>
                    <tr>
                      <th>상담하고 싶은 메뉴</th>
                      <td>{selectedInquiry.menus.join(" / ")}</td>
                    </tr>
                    <tr>
                      <th>첨부된 이미지</th>
                      <td>
                        {selectedInquiry.files.length > 0 ? ( // 이미지가 있는 경우에만 렌더링
                          <div className="file-preview-container">
                            {selectedInquiry.files.map((file, fileIndex) => {
                              const base64String = arrayBufferToBase64(file.fileblob.data);
                              return (
                                <div key={fileIndex} className="file">
                                  <img
                                    src={`data:image/jpeg;base64,${base64String}`}
                                    alt={`File ${fileIndex + 1}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", margin: "5px" }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p>첨부된 이미지가 없습니다.</p> // 이미지가 없을 경우 메시지 표시
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="inquiry-buttons">
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="back-button"
                  >
                    목록보기
                  </button>
                  <button
                    className="delete-button"
                    onClick={deleteCurrentInquiry} // 상세 페이지에서 삭제
                  >
                    삭제
                  </button>
                </div>
                <div className="inquiry-comments">
                  <h4>댓글 {selectedInquiry.comments.length}</h4>
                  <ul className="comment-list">
                    {selectedInquiry.comments.map((comment, index) => (
                      <li key={index} className="comment-item">
                        <span className="comment-author">{comment.user_name}</span>
                        <span className="comment-time">{dayjs(comment.created_at).format('YYYY.MM.DD HH:mm')}</span>
                        {editingCommentId === comment.id ? (
                          <textarea
                            className="comment-edit-input"
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                          />
                        ) : (
                          <p className="comment-content">{comment.content}</p>
                        )}
                        <div className="comment-actions">
                          {editingCommentId === comment.id ? (
                            <>
                              <button
                                className="comment-save"
                                onClick={() => handleEditSave(comment.id, selectedInquiry.id)}
                              >
                                저장
                              </button>
                              <button className="comment-cancel" onClick={handleEditCancel}>
                                취소
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="comment-edit"
                                onClick={() => handleEditClick(comment.id, comment.content)}
                              >
                                수정
                              </button>
                              <button
                                className="comment-delete"
                                onClick={() => handleCommentDelete(comment.id, selectedInquiry.id)}
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <textarea
                    className="comment-input"
                    placeholder="내용을 입력해주세요."
                    maxLength={3000}
                  ></textarea>
                  <div className="comment-footer">
                    <span>0 / 3000</span>
                    <button
                      className="comment-submit"
                      onClick={() => handleCommentSubmit(selectedInquiry.id, document.querySelector(".comment-input").value)}
                    >
                      댓글입력
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3>나의 문의/신청 내역</h3>
                <table className="inquiries-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedAll} // 전체 선택 상태
                          onChange={handleSelectAll} // 전체 선택 핸들러
                        />
                      </th>
                      <th>번호</th>
                      <th>글제목</th>
                      <th>글쓴이</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length > 0 ? (
                      inquiries.map((inquiry, index) => (
                        <tr
                          key={inquiry.id}
                          onClick={() => handleInquirySelect(inquiry)} // 행 클릭 시 상세 페이지로 이동
                          style={{ cursor: "pointer" }}
                        >
                          <td>
                            <input
                              type="checkbox"
                              checked={inquiry.isSelected || false} // 개별 선택 상태
                              onChange={() => handleSelect(inquiry.id)} // 개별 선택 핸들러
                              onClick={(event) => event.stopPropagation()} // 클릭 이벤트 전파 방지
                            />
                          </td>
                          <td>{totalCount - ((currentPage - 1) * itemsPerPage + index)}</td> {/* 역순 번호 계산 */}
                          <td>
                            {inquiry.files.length > 0 && (
                              <img
                                src={`data:image/jpeg;base64,${arrayBufferToBase64(inquiry.files[0].fileblob.data)}`}
                                alt="Thumbnail"
                                style={{
                                  width: "70px",
                                  height: "50px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                  verticalAlign: "middle",
                                }}
                              />
                            )}
                            {inquiry.title}
                          </td>
                          <td>{inquiry.username}</td>
                          <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">등록된 글이 없습니다</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* 하단 컨트롤 영역 */}
                <div className="inquiries-controls">
                  <button
                    className="delete-selected-button"
                    onClick={deleteSelected} // 선택된 항목 삭제
                  >
                    선택삭제
                  </button>
                  {/* 페이징 UI */}
                  <div className="pagination">
                    <button
                      className="pagination-button"
                      disabled={currentPage === 1} // 첫 페이지에서는 비활성화
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        className={`pagination-button ${currentPage === number ? "active" : ""}`} // 현재 페이지에 active 클래스 추가
                        onClick={() => handlePageChange(number)}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      className="pagination-button"
                      disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &gt;
                    </button>
                  </div>
                  <button
                    className="inquiry-button"
                    onClick={() => setActiveTab("survey")} // 설문 이벤트 탭으로 이동
                  >
                    문의하기
                  </button>
                </div>

                {/* 검색 영역 */}
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="search-button" onClick={handleSearch}>
                    검색
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;