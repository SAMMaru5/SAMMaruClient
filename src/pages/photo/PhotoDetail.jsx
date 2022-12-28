import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./PhotoDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import Comment from "../../components/Comment";

import { Navigation } from "swiper";
import api from "../../utils/api";
import { deletePost } from "../../hooks/usePostServices";
const PhotoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [createDt, setCreateDt] = useState("");
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    api
      .get(
        "/api/boards/" +
          location.state.boardId +
          "/articles/" +
          location.state.articleId
      )
      .then((response) => {
        if (response.data.success) {
          setArticle(response.data.response);
          setMainImg(response.data.response.files[0].filePath);
          setLoading(true);
          setCreateDt(response.data.response.createDt.slice(0, 10));
        } else {
          Swal.fire({
            icon: "error",
            title: "게시글 정보를 가져오기를 실패했습니다.",
          });
        }
      });
  }, [location.state.boardId, location.state.articleId]);
  return (
    <div className="photo-detail-content pt-5">
      {loading ? (
        <div>
          <h3 style={{ justifyContent: "center", fontSize: "30px" }}>
            {article.title}
          </h3>
          <div>
            <span>
              {article.author} | {createDt}
            </span>
            <span className="float-right">
              조회수: <b>{article.viewCnt}</b>
            </span>
          </div>
          <hr />
          <div className="show-imageList">
            <Swiper
              slidesPerView={5}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {article.files.map((img, id) => (
                <SwiperSlide key={id}>
                  <div
                    className="slide"
                    onClick={() => {
                      setMainImg(img.filePath);
                    }}
                  >
                    <img
                      src={
                        process.env.REACT_APP_URL +
                        "/no-permit/api/boards/" +
                        location.state.boardId +
                        "/articles/" +
                        location.state.articleId +
                        "/files/" +
                        img.filePath
                      }
                      alt="photoDetail-img"
                      style={{
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <hr />

          <div
            className="show-image"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={
                process.env.REACT_APP_URL +
                "/no-permit/api/boards/" +
                location.state.boardId +
                "/articles/" +
                location.state.articleId +
                "/files/" +
                mainImg
              }
              alt="photoDetail-img"
              style={{ width: "60%", height: "10%" }}
            />
          </div>
          <hr />

          <pre>{article.content}</pre>
          <Comment
            boardId={location.state.boardId}
            articleId={location.state.articleId}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <button
              className="deep-orange darken-4 mr-3"
              onClick={() => deletePost(location.state)}
            >
              글 삭제
            </button>
            <button
              className="w3-bar-item w3-button grey darken-3"
              style={{
                width: "130px",
                padding: "10px 0px 10px 0px",
              }}
              onClick={() => {
                navigate("../photo");
              }}
            >
              글 목록
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <img
            src="img/loading.gif"
            alt="로딩중"
            style={{ margin: "3em auto", width: "25%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;
