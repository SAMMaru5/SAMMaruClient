import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getBoardList } from "../../hooks/boardServices";
import api from "../../utils/api";

function ExamUpdate() {
  const [boardId, setBoardId] = useState(0);
  const [photo, setPhoto] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const [uploadFile, setUploadFile] = useState([]);

  useEffect(() => {
    getBoardList().then((response) => {
      console.log(response.data);
      if (response.data.success) {
        response.data.response.forEach((res) => {
          if (res.name === "족보") {
            setBoardId(res.id);
          }
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

    formData.append("file", uploadFile[0]);

    formData.append(
      "article",
      new Blob([JSON.stringify(photo)], { type: "application/json" })
    );

    api.post(`/api/boards/${boardId}/articles`, formData).then((response) => {
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "게시글 작성을 성공했습니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/exam");
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
        navigate("../exam");
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
              setUploadFile(e.target.files);
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
          <Button variant="grey" size="lg" onClick={handlePostCancel}>
            작성취소
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ExamUpdate;
