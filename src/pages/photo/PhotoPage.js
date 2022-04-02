import PhotoList from "./PhotoList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PhotoPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Button variant="primary" onClick={() => navigate("./photoUpdate")}>
        글쓰기
      </Button>
      <PhotoList />
    </div>
  );
}

export default PhotoPage;
