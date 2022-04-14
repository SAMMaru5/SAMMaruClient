import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { call } from "../../hooks/useFetch";
import Swal from "sweetalert2";

function PhotoUpdate() {
  const [boardId, setBoardId] = useState(0);
  const [photo, setPhoto] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    call("/no-permit/api/boards", "GET").then((response) => {
      console.log(response.response[0]);
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name == "사진첩") {
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
    call(`/api/boards/${boardId}/articles`, "POST", photo).then((response) => {
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "게시글 작성을 성공했습니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "게시글 작성을 실패했습니다.",
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
          <Form.Control type="file" multiple />
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
          <Button variant="dark" type="submit" size="lg" abled>
            작성완료
          </Button>
          <Button variant="light" size="lg" abled>
            작성취소
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PhotoUpdate;
