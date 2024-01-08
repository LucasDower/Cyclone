"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <div className="fullscreen-container">
      <Swiper>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>
    </div>
  )
}
