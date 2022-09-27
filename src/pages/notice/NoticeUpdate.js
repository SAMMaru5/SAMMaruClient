import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { getBoardList } from "../../hooks/boardServices";
import { myRole } from "../../hooks/useAuth";
import { delCookie, getCookie } from "../../hooks/useCookie";

function NoticeRegisteration() {
  const [boardId, setBoardId] = useState(0);
  const [uploadfile, setUploadfile] = useState([]);
  const [notice, setNotice] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    myRole().then((response) => {
      if (response === "not authorized") {
        navigate("/login");
      } else if (response !== "admin") {
        Swal.fire({
          icon: "info",
          title: "접근 권한이 없습니다. 관리자에게 문의해 주세요.",
        }).then((result) => {
          navigate("../notice");
        });
      }
    });
    getBoardList().then((response) => {
      if (response.data.success) {
        response.data.response.forEach((res) => {
          if (res.name === "공지사항") {
            setBoardId(res.id);
          }
        });
      }
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    function expiredLogin() {
      Swal.fire({
        title: "로그인 상태 허용 시간이 초과되었습니다.",
        text: "로그인 페이지로 다시 이동하시겠습니까?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }

    async function getUserInfo() {
      try {
        await api.get("/no-permit/api/user/info").then((response) => {
          const noticeBtn = document.getElementById("noticeBtn");
          noticeBtn.setAttribute("disabled", true);
          noticeBtn.innerText = "글등록 중...";

          let formData = new FormData();
          formData.append("file", uploadfile[0]);

          formData.append(
            "article",
            new Blob([JSON.stringify(notice)], { type: "application/json" })
          );

          api
            .post(`/api/boards/${boardId}/articles`, formData)
            .then((response) => {
              if (response.data.success) {
                Swal.fire({
                  icon: "success",
                  title: "게시글 작성을 성공했습니다.",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/notice");
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "게시글 작성을 실패했습니다.",
                });
              }
            });
        });
      } catch (error) {
        delCookie("SammaruAccessToken");
        expiredLogin();
      }
    }
    if (getCookie("SammaruAccessToken")) getUserInfo();
    else expiredLogin();
  };

  const handlePostCancel = () => {
    Swal.fire({
      title: "글 작성을 취소하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("../notice");
      } else {
      }
    });
  };

  return (
    <div
      className="container"
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        marginBottom: "100px",
      }}
    >
      <div>
        <div>
          <Form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Group>
                <Form.Label>제목</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  placeholder="제목"
                  onChange={(e) => {
                    setNotice({ ...notice, title: e.target.value });
                  }}
                ></Form.Control>
                <Form.Group className="mb-3" controlId="formFileMultiple">
                  <Form.Label>파일 등록</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="file"
                    onChange={(e) => {
                      setUploadfile(e.target.files);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => {
                      setNotice({ ...notice, content: e.target.value });
                    }}
                  />
                </Form.Group>
              </Form.Group>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          id="noticeBtn"
          variant="dark"
          type="submit"
          size="lg"
          onClick={onSubmit}
        >
          작성완료
        </Button>
        <Button variant="grey" size="lg" onClick={handlePostCancel}>
          작성취소
        </Button>
      </div>
    </div>
  );
}

export default NoticeRegisteration;
