import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { call } from "../../hooks/useFetch";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from "../../hooks/app-config";
import { getCookie } from "../../hooks/useCookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./PhotoUpdate.scss";
import { Navigation } from "swiper";

function PhotoUpdate() {
  const [boardId, setBoardId] = useState(0);
  const [photo, setPhoto] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const [uploadfile, setUploadfile] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && accessToken !== null) {
      setAuthorizationValue("Bearer " + accessToken);
    }
    if (refreshToken && refreshToken !== null) {
      setRefreshTokenValue("Bearer " + refreshToken);
    }

    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "사진첩") {
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

  const fileChange = (e) =>{
    const imageLists = e.target.files;
    let imgUrlLists = [...showImages];
    let imgFileLists = [...uploadfile];

    for(let i = 0; i<imageLists.length; i++){
      imgFileLists.push(imageLists[i]);
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imgUrlLists.push(currentImageUrl);
    }

    setUploadfile(imgFileLists);
    setShowImages(imgUrlLists);
  }
  
  const handleDeleteImage= (id) =>{
    Swal.fire({
      icon: "info",
      html:'<img style="width:400px; height:400px" class="preImg" src='+showImages[id]+' alt='+(showImages[id] - id)+'/> ',
      title: `${id+1}번째 사진을 삭제하시겠습니까? `,
      showDenyButton: true,
      confirmButtonText: '네',
      denyButtonText: `아니요`

    }).then((result) => {
      if (result.isConfirmed) {
        setShowImages(showImages.filter((_, index) => index !== id));
        setUploadfile(uploadfile.filter((_, index) => index !== id));
      }
      else{

      }
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const photoBtn = document.getElementById("photoBtn");
    photoBtn.setAttribute('disabled', true);
    photoBtn.innerText = "글등록 중..."

    if (uploadfile[0] === undefined) {
      Swal.fire({
        icon: "error",
        title: "사진을 추가해주세요.",
      }).then((result)=>{
        if(result){
          photoBtn.removeAttribute('disabled');
          photoBtn.innerText = "작성완료"
      }
      });
      return;
    }

    let formData = new FormData();
    console.log(uploadfile.length);
    for(let i = 0; i < uploadfile.length; i++){
      formData.append("file", uploadfile[i]);
    }
    

    formData.append(
      "article",
      new Blob([JSON.stringify(photo)], { type: "application/json" })
    );

    if (authorizationValue === "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (refreshTokenValue === "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    let headers = {
      "Content-Type": "application/json",
      Authorization: authorizationValue,
      RefreshToken: refreshTokenValue,
    };

    axios
      .post(API_BASE_URL + `/api/boards/${boardId}/articles`, formData, {
        headers: headers,
      })
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
          }).then((result)=>{
            if(result){
              photoBtn.removeAttribute('disabled');
              photoBtn.innerText = "작성완료"
          }
          });
        }
      });
  };

  return (
    <div
      id="PhotoUpdate"
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
        <div className="show-imageList">
            <Swiper
              slidesPerView={5}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >              

            <div className="slide">
            {
              showImages.map((img, id)=>(
                <SwiperSlide>
                <div className="img" key={id}>
                    <img src={img} alt={`${img}-${id}`} onClick={() => handleDeleteImage(id)}/>
                </div>
              </SwiperSlide>
              ))
            }
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
          <Button id="photoBtn" variant="dark" type="submit" size="lg" abled>
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
