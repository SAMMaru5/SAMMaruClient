import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getCookie } from "../../hooks/useCookie";
import { API_BASE_URL } from "../../hooks/app-config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { call } from "../../hooks/useFetch";
import axios from "axios";

function NoticeRegisteration() {
  const [boardId, setBoardId] = useState(0);
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");
  const [uploadfile, setUploadfile] = useState([]);
  const [notice, setNotice] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && accessToken !== null) {
      setAuthorizationValue("Bearer " + accessToken);
    }
    if (refreshToken && refreshToken !== null) {
      setRefreshTokenValue("Bearer " + refreshToken);
    }

    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "공지사항") {
            setBoardId(response.response[i].id);
          }
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "게시판 목록 가져오기를 실패했습니다.",
        });
      }
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const noticeBtn = document.getElementById("noticeBtn");
    noticeBtn.setAttribute("disabled", true);
    noticeBtn.innerText = "글등록 중...";

    let formData = new FormData();
    formData.append("file", uploadfile[0]);

    formData.append(
      "article",
      new Blob([JSON.stringify(notice)], { type: "application/json" })
    );

    if (authorizationValue === "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (refreshTokenValue === "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    let headers = {
      "Content-Type": "application/json",
      Authorization: authorizationValue,
      RefreshToken: refreshTokenValue,
    };

    axios
      .post(API_BASE_URL + `/api/boards/${boardId}/articles`, formData, {
        headers: headers,
      })
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
          }).then((result) => {
            if (result) {
              noticeBtn.removeAttribute("disabled");
              noticeBtn.innerText = "작성완료";
            }
          });
        }
      });
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
            <Form.Group>
              <Form.Label>제목</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="제목"
                onChange={(e) => {
                  setNotice({ ...notice, title: e.target.value });
                }}
              />
            </Form.Group>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button id="noticeBtn" variant="dark" type="submit" size="lg">
                작성완료
              </Button>
              <Button variant="grey" size="lg" onClick={handlePostCancel}>
                작성취소
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default NoticeRegisteration;
