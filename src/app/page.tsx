"use client";

import TimeDate from "@/components/slides/SlideTimeDate";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <div className="fullscreen-container">
      <Swiper>
        <SwiperSlide><TimeDate></TimeDate></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  )
}
