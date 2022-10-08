import { Form, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
    }
    else {
      let fileUrlLists = [...showFiles]
      let uploadFileLists = [...uploadFile]

      for (let i = 0; i < fileLists.length; i++) {
        uploadFileLists.push(fileLists[i]);
        const currentFileUrl = URL.createObjectURL(fileLists[i]);
        fileUrlLists.push({ 'url': currentFileUrl, 'name': fileLists[i].name });
      }
      setShowFiles(fileUrlLists)
      setUploadFile(uploadFileLists);
    }


  }

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
          formData.append("file", uploadFile[i])
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
            {showFiles.length ?
              <Card>
                <ListGroup variant="flush">
                  {showFiles.map((file, id) => (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center" >
                      <span>
                        <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-code" viewBox="0 0 16 16">
                          <path d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z" />
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                        </svg>
                        {file.name}
                      </span>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleDeleteImage(id)}>X</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
              :
              null
            }
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
