import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./PhotoDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import { call } from "../../hooks/useFetch";

import { Navigation } from "swiper";
const PhotoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [createDt, setCreateDt] = useState("");

  useEffect(() => {
    call(
      "/api/boards/" +
        location.state.boardId +
        "/articles/" +
        location.state.articleId,
      "GET"
    ).then((response) => {
      if (response.success) {
        setArticle(response.response);
        setLoading(true);
        setCreateDt(response.response.createDt.slice(0, 10));
      } else {
        Swal.fire({
          icon: "error",
          title: "게시글 정보를 가져오기를 실패했습니다.",
        });
      }
    });
  }, [location.state.boardId, location.state.articleId]);
  return (
    <div className="photo-detail-content">
      {loading ? (
        <div>
          <h3 style={{ justifyContent: "center", fontSize: "30px" }}>
            {article.title}{" "}
          </h3>
          <p>
            {"   "}
            {article.author} | {createDt}
          </p>
          <hr />
          <div className="show-imageList">
            <Swiper
              slidesPerView={5}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="slide">
                  <img
                    src={
                      "http://localhost:8080/no-permit/api/boards/" +
                      location.state.boardId +
                      "/articles/" +
                      location.state.articleId +
                      "/files/" +
                      article.files[0].filePath
                    }
                    alt="photoDetail-img"
                    style={{ width: "100%" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide">
                  <img
                    src={
                      "http://localhost:8080/no-permit/api/boards/" +
                      location.state.boardId +
                      "/articles/" +
                      location.state.articleId +
                      "/files/" +
                      article.files[0].filePath
                    }
                    alt="photoDetail-img"
                    style={{ width: "100%" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide">
                  <img
                    src={
                      "http://localhost:8080/no-permit/api/boards/" +
                      location.state.boardId +
                      "/articles/" +
                      location.state.articleId +
                      "/files/" +
                      article.files[0].filePath
                    }
                    alt="photoDetail-img"
                    style={{ width: "100%" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide">
                  <img
                    src={
                      "http://localhost:8080/no-permit/api/boards/" +
                      location.state.boardId +
                      "/articles/" +
                      location.state.articleId +
                      "/files/" +
                      article.files[0].filePath
                    }
                    alt="photoDetail-img"
                    style={{ width: "100%" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide">
                  <img
                    src={
                      "http://localhost:8080/no-permit/api/boards/" +
                      location.state.boardId +
                      "/articles/" +
                      location.state.articleId +
                      "/files/" +
                      article.files[0].filePath
                    }
                    alt="photoDetail-img"
                    style={{ width: "100%" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide">돌아가 없어</div>
              </SwiperSlide>
            </Swiper>
          </div>
          <hr />

          <div
            className="show-image"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={
                "http://localhost:8080/no-permit/api/boards/" +
                location.state.boardId +
                "/articles/" +
                location.state.articleId +
                "/files/" +
                article.files[0].filePath
              }
              alt="photoDetail-img"
              style={{ width: "60%", height: "10%" }}
            />
          </div>
          <hr />

          <p>{article.content}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <button
              className="w3-bar-item w3-button"
              style={{
                background: "#6a81ed",
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
        <div></div>
      )}
    </div>
  );
};

export default PhotoDetail;
