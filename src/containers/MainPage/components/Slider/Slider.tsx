"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Slider.module.scss";
import { Pagination, Autoplay } from "swiper/modules";
import SliderItem from "../SliderItem/SliderItem";

export interface SlideItemProps {
  title: string;
  src: string;
  content: string;
  link: string;
}

const Slider = () => {
  const slideItem: SlideItemProps[] = [
    {
      title: "나만의 Next.js Blog 프로젝트 구상",
      src: "/images/mainSliderItems/m01.png",
      content:
        "Next13을 학습과 동시에 내가 무엇을 개발할 수 있는지 블로그를 직접 만들어보고자 한다. 각 기능을 구현하는데 얼마큼의 시간이 걸릴까?",
      link: "https://sakuraop.tistory.com/590",
    },
    {
      title: "블로그 프로젝트 게시물 레이아웃 (+라우팅 방법)",
      src: "/images/mainSliderItems/m02.png",
      content:
        "Next.js는 정적인 영역은 SSR으로 구현을 하고, 인터렉션 영역은 CSR로 구현하게 된다. 이 둘의 영역을 잘 구분하는 것이 포인트가 아닐까?",
      link: "https://sakuraop.tistory.com/591",
    },
    {
      title: "Session방식 소셜 로그인 구현 + MongoDB 유저정보 저장",
      src: "/images/mainSliderItems/m03.png",
      content:
        "Next.js에서는 next-auth로 소셜 로그인을 간단하게 구현할 수 있다. MongoDB와 연동하여 회원가입, 로그인 기능을 구현해보자.",
      link: "https://sakuraop.tistory.com/594",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className={styles.swiper}
    >
      {slideItem.map((item, index) => {
        const slideItemProps: SlideItemProps = {
          ...item,
        };
        return (
          <SwiperSlide key={index}>
            <SliderItem slideItemProps={slideItemProps} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
