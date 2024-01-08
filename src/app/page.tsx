"use client";

import TimeDate from "@/components/TimeDate";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <div className="fullscreen-container">
      <Swiper>
        <SwiperSlide className="align-center"><TimeDate></TimeDate></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>
    </div>
  )
}
