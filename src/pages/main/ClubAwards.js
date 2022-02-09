import './ClubAwards.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation} from "swiper";

function ClubAwards() {
    return(
        <div className="ClubAwards">
        <Swiper
        slidesPerView={4}
        navigation={true}
        modules={[ Navigation]}
        className="mySwiper"
      >
        
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>C-2020-028502</h5>
          <p>컨설팅-비즈니스-상담</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>특허출원</h5>
          <p>소셜 매칭 서비스 시스템</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>벤처기업 확인서</h5>
          <p>-</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>산업디자인전문회사 신고확인증</h5>
          <p>-</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>특허출원</h5>
          <p>소셜 매칭 서비스 시스템</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>특허출원</h5>
          <p>소셜 매칭 서비스 시스템</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
          <img src='img/award-test.PNG' alt='award-img'/>
          <h5>특허출원</h5>
          <p>소셜 매칭 서비스 시스템</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">돌아가 없어</div>
        </SwiperSlide>
        
        
      </Swiper>
        </div>
    )
}

export default ClubAwards;