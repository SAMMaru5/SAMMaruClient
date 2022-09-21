import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./PhotoUpdate.scss";
import { Navigation } from "swiper";
import {getBoardList, handlePostCancel} from "../../hooks/boardServices";
import api from "../../utils/api";

function PhotoUpdate() {
  const [boardId, setBoardId] = useState(0);
  const [photo, setPhoto] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const [uploadfile, setUploadfile] = useState([]);
  const [showImages, setShowImages] = useState([]);

  useEffect(() => {
    getBoardList().then(response => {
      console.log(response.data);
      if(response.data.success) {
        response.data.response.forEach(res => {
          if(res.name === '사진첩'){
            setBoardId(res.id);
          }
        })
      }
    });
  }, []);

  const fileChange = (e) => {
    const imageLists = e.target.files;
    let imgUrlLists = [...showImages];
    let imgFileLists = [...uploadfile];

    for (let i = 0; i < imageLists.length; i++) {
      imgFileLists.push(imageLists[i]);
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imgUrlLists.push(currentImageUrl);
    }

    setUploadfile(imgFileLists);
    setShowImages(imgUrlLists);
  };

  const handleDeleteImage = (id) => {
    Swal.fire({
      icon: "info",
      html:
        '<img style="height:100%" class="preImg" src=' +
        showImages[id] +
        " alt=" +
        (showImages[id] - id) +
        "/> ",
      title: `${id + 1}번째 사진을 삭제하시겠습니까? `,
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: `아니요`,
    }).then((result) => {
      if (result.isConfirmed) {
        setShowImages(showImages.filter((_, index) => index !== id));
        setUploadfile(uploadfile.filter((_, index) => index !== id));
      } else {
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const photoBtn = document.getElementById("photoBtn");
    photoBtn.setAttribute("disabled", true);
    photoBtn.innerText = "글등록 중...";

    if (uploadfile[0] === undefined) {
      Swal.fire({
        icon: "error",
        title: "사진을 추가해주세요.",
      }).then((result) => {
        if (result) {
          photoBtn.removeAttribute("disabled");
          photoBtn.innerText = "작성완료";
        }
      });
      return;
    }

    let formData = new FormData();
    console.log(uploadfile.length);
    for (let i = 0; i < uploadfile.length; i++) {
      formData.append("file", uploadfile[i]);
    }

    formData.append(
      "article",
      new Blob([JSON.stringify(photo)], { type: "application/json" })
    );


    api.post(`/api/boards/${boardId}/articles`, formData)
        .then((response) => {
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "게시글 작성을 성공했습니다.",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/photo");
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
      id="PhotoUpdate"
      className="container"
      style={{
        padding: "50px 100px 100px 100px",
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
          <div className="show-imageList">
            <Swiper
              slidesPerView={5}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <div className="slide">
                {showImages.map((img, id) => (
                  <SwiperSlide key={id}>
                    <div className="img">
                      <img
                        src={img}
                        alt={`${img}-${id}`}
                        style={{ width: "50%", height: "50%" }}
                        onClick={() => handleDeleteImage(id)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
          <Form.Label>사진 선택</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => {
              fileChange(e);
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
          <Button id="photoBtn" variant="dark" type="submit" size="lg">
            작성완료
          </Button>
          <Button variant="grey" size="lg" onClick={handlePostCancel('/photo')}>
            작성취소
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PhotoUpdate;
