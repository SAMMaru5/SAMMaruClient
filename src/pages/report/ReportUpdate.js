import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { call } from "../../hooks/useFetch";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from "../../hooks/app-config";
import { getCookie } from "../../hooks/useCookie";

function ReportUpdate() {
  const [boardId, setBoardId] = useState(0);
  const [photo, setPhoto] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const [uploadfile, setUploadfile] = useState([]);
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");

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
          if (response.response[i].name === "활동보고서") {
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

    const examBtn = document.getElementById("examBtn");
    examBtn.setAttribute("disabled", true);
    examBtn.innerText = "글등록 중...";

    let formData = new FormData();

    formData.append("file", uploadfile[0]);

    formData.append(
      "article",
      new Blob([JSON.stringify(photo)], { type: "application/json" })
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
              navigate("/report");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "게시글 작성을 실패했습니다.",
          }).then((result) => {
            if (result) {
              examBtn.removeAttribute("disabled");
              examBtn.innerText = "작성완료";
            }
          });
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
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            onChange={(e) => {
              setPhoto({ ...photo, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>사진 선택</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => {
              setUploadfile(e.target.files);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => {
              setPhoto({ ...photo, content: e.target.value });
            }}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button id="examBtn" variant="dark" type="submit" size="lg">
            작성완료
          </Button>
          <Button variant="light" size="lg">
            작성취소
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ReportUpdate;
