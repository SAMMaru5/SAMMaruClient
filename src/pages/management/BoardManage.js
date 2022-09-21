import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../utils/api";
import {myRole} from "../../hooks/useAuth";

function BoardManage() {
  const [board, setBoard] = useState({ boardName: "", description: "" });
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    myRole().then((response) => {
      if (response === "not authorized") {
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          navigate("/login");
        });
      } else if (response !== "admin") {
        Swal.fire({
          icon: "info",
          title: "접근 권한이 없습니다. 관리자에게 문의해 주세요.",
        }).then((result) => {
          navigate("/login");
        });
      }
    });


    api.post("/api/boards").then((response) => {
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
