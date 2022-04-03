import React from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

function BoardManage() {
  const [board, setBoard] = useState({ studentId: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("선택");
    /*makeBoard(board).then((response)=>{
            if(response.success){
                Swal.fire({
                    icon: 'success',
                    title: '로그인에 성공하셨습니다.',
                  })
                  .then((result)=>{
                      if(result.isConfirmed){
                          navigate("/")
                      }
                  })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: '로그인에 실패하셨습니다.',
                  })
            }
        });*/
  };

  return (
    <div>
      <Form
        onSubmit={() => {
          onSubmit();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>게시판 제목</Form.Label>
          <Form.Control type="email" placeholder="Enter Title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>게시판 설명</Form.Label>
          <Form.Control type="password" placeholder="Enter Description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BoardManage;
