import { Form, Button } from "react-bootstrap";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getCookie } from "../../hooks/useCookie";
import { API_BASE_URL } from "../../hooks/app-config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NoticeRegisteration() {
  const editorRef = React.createRef();
  const [boardId, setBoardId] = useState(0);
  const [title, setTitle] = useState("");
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && accessToken !== null) {
      setAuthorizationValue("Bearer " + accessToken);
    }
    if (refreshToken && refreshToken !== null) {
      setRefreshTokenValue("Bearer " + refreshToken);
    }
    
    // boardID 가져오기 미완입니다.
    const boardListData = async () => {
      const response = await axios.get(API_BASE_URL + '/no-permit/api/boards');
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "공지게시판") {
            setBoardId(response.response[i].id);
          }
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "게시판 목록 가져오기를 실패했습니다.",
        });
      }
    };

    boardListData();
  }, []);


  
  const onCreate = () => {;
    let contentData = editorRef.current.getInstance().getMarkdown();
    let formData = new FormData();
    formData.append("file", file[0]);

    let variables = {
      title: title,
      content: contentData
    };
    
    let headers = {
      "Content-Type": "application/json",
      Authorization: authorizationValue,
      RefreshToken: refreshTokenValue,
    };

    formData.append("article", new Blob([JSON.stringify(variables)], { type: "application/json" }));

    console.log("boardID: "+boardId);

    // boardID 불러오기 실패해서 + 1 해놨습니다
    Axios.post(API_BASE_URL + `/api/boards/${boardId + 1}/articles`, formData, {
      headers: headers,
    }).then((response) => {
      if (response.data.success) {
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
  }

  return (
    <div className="NoticeRegisteration">
      <div className="container">
        <div>공지사항 등록</div>
        <div>
          <div>
            <Form>
              <Form.Group>
                <Form.Control type="text" placeholder="제목" onChange={(event) => setTitle(event.target.value)}></Form.Control>
                <Form.Control type="file" onChange={(event) => setFile(event.target.files)} />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div>
          <Editor
            previewStyle="vertical"
            height="300px"
            initialEditType="markdown"
            ref={editorRef}
          />

        </div>
        <div>
          <Button onClick={onCreate}>글등록</Button>
          <Button>목록으로</Button>
        </div>
      </div>
    </div>
  );

}

export default NoticeRegisteration;