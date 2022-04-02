import { Form } from "react-bootstrap";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


function NoticeRegisteration() {
  return (
    <div className="NoticeRegisteration">
      <div className="container">
        <div>공지사항 등록</div>
        <div>
          <div>
            <Form>
              <Form.Group>
                <Form.Control type="text" placeholder="제목"></Form.Control>
                <Form.Control type="file" />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div>
          <Editor previewStyle='vertical'/>
        </div>
        <div>
          <button>글등록</button>
          <button>목록으로</button>
        </div>
      </div>
    </div>
  );

}

export default NoticeRegisteration;