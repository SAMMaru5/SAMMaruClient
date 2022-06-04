import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
  }, []);
  return (
    <div className="photo-detail-content">
      {loading ? (
        <div>
          <p style={{ justifyContent: "center", fontSize: "30px" }}>
            {article.title}{" "}
          </p>
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
                    alt="photo-img"
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
                    alt="photo-img"
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
                    alt="photo-img"
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
                    alt="photo-img"
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
                    alt="photo-img"
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
              style={{ width: "60%", height: "10%" }}
            />
          </div>
          <hr />

          <p>{article.content}</p>
          <Button
            variant="primary"
            onClick={() => {
              navigate("../photo");
            }}
          >
            글 목록
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PhotoDetail;
