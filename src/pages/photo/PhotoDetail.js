import React from "react";
import "./PhotoDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper";
const PhotoDetail = () => {
  return (
    <div className="content">
      <p style={{ justifyContent: "center", fontSize: "30px" }}>
        샘마루세미나{" "}
      </p>
      <p>{"   "}작성자 | 작성일자</p>
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
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
                alt="photo-img"
                style={{ width: "100%" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
                alt="photo-img"
                style={{ width: "100%" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
                alt="photo-img"
                style={{ width: "100%" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
                alt="photo-img"
                style={{ width: "100%" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
                alt="photo-img"
                style={{ width: "100%" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
                alt="photo-imgg"
                style={{ width: "100%" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
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

      <div className="show-image">
        <img
          src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
          style={{ width: "100%", height: "10%" }}
        />
      </div>
      <hr />

      <p>
        Loemasdfds dagsd dsgka djpafjef jewfpj Loemasdfds dagsd dsgka djpafjef
        jewfpjLoemasdfds dagsd dsgka djpafjef jewfpjLoemasdfds dagsd dsgka
        djpafjef jewfpjLoemasdfds dagsd dsgka djpafjef jewfpj
      </p>
    </div>
  );
};

export default PhotoDetail;
