import { Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { getBoardList } from "../../hooks/boardServices";
import { checkExpiredAccesstoken } from "../../hooks/useAuth";

function ExamUpdate() {
  const [boardId, setBoardId] = useState(0);
  const [photo, setPhoto] = useState({ title: "", content: "" });
  const [uploadFile, setUploadFile] = useState([]);
  const [showFiles, setShowFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBoardList().then((response) => {
      if (response.data.success) {
        response.data.response.forEach((res) => {
          if (res.name === "족보") {
            setBoardId(res.id);
          }
        });
      }
    });
  }, []);

  const fileChange = (e) => {
    const fileLists = e.target.files;

    if (fileLists.length + uploadFile.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "파일첨부를 5개 초과할 수 없습니다.",
      });
    } else {
      let fileUrlLists = [...showFiles];
      let uploadFileLists = [...uploadFile];

      for (let i = 0; i < fileLists.length; i++) {
        uploadFileLists.push(fileLists[i]);
        const currentFileUrl = URL.createObjectURL(fileLists[i]);
        fileUrlLists.push({ url: currentFileUrl, name: fileLists[i].name });
      }
      setShowFiles(fileUrlLists);
      setUploadFile(uploadFileLists);
    }
  };

  const handleDeleteImage = (id) => {
    setShowFiles(showFiles.filter((_, index) => index !== id));
    setUploadFile(uploadFile.filter((_, index) => index !== id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    checkExpiredAccesstoken().then((response) => {
      if (response) {
        const examBtn = document.getElementById("examBtn");
        examBtn.setAttribute("disabled", true);
        examBtn.innerText = "글등록 중...";

        let formData = new FormData();
        for (let i = 0; i < uploadFile.length; i++) {
          formData.append("file", uploadFile[i]);
        }

        formData.append(
          "article",
          new Blob([JSON.stringify(photo)], { type: "application/json" })
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
            className="mb-3"
            type="file"
            multiple
            onChange={(e) => {
              fileChange(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>등록된 파일</Form.Label>
          {showFiles.length ? (
            <Card>
              <ListGroup variant="flush">
                {showFiles.length ? (
                  <Card>
                    <ListGroup variant="flush">
                      {showFiles.map((file, id) => (
                        <ListGroup.Item
                          className="d-flex justify-content-between align-items-center"
                          key={id}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              width="24"
                            >
                              <path d="M6.3 21.5q-.75 0-1.275-.525Q4.5 20.45 4.5 19.7V4.3q0-.75.525-1.275Q5.55 2.5 6.3 2.5h7.95l5.25 5.25V19.7q0 .75-.525 1.275-.525.525-1.275.525Zm7.2-13V4H6.3q-.1 0-.2.1t-.1.2v15.4q0 .1.1.2t.2.1h11.4q.1 0 .2-.1t.1-.2V8.5ZM6 4v4.5V4 20 4Z" />
                            </svg>
                            &nbsp;{file.name}
                          </span>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteImage(id)}
                          >
                            <i className="fa-solid fa-xmark" />
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                ) : null}
              </ListGroup>
            </Card>
          ) : null}
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
