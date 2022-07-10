import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { call } from "../../hooks/useFetch";
import Swal from "sweetalert2";

function BoardManage() {
  const [board, setBoard] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    call("/api/boards", "POST", board).then((response) => {
      console.log(response);
      if (response.success) {
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
