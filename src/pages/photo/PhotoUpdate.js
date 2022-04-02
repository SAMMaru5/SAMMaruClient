import React from "react";
import { Form, Button } from "react-bootstrap";

function PhotoUpdate() {
  return (
    <div
      className="container"
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        marginBottom: "100px",
      }}
    >
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="email" placeholder="제목을 입력하세요" />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>사진 선택</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="dark" size="lg" abled>
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
