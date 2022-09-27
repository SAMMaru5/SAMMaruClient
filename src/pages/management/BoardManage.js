import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { delCookie, getCookie } from "../../hooks/useCookie";

function BoardManage() {
  const [board, setBoard] = useState({ boardName: "", description: "" });
  const navigate = useNavigate();

  const onSubmit = (e) => {
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
          api.post("/api/boards", board).then((response) => {
            if (response.data.success) {
              Swal.fire({
                icon: "success",
                title: "게시판 생성을 성공했습니다.",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "게시판 생성을 실패했습니다.",
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

  return (
    <div>
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>게시판 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={(e) => {
              setBoard({ ...board, boardName: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>게시판 설명</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            onChange={(e) => {
              setBoard({ ...board, description: e.target.value });
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BoardManage;
