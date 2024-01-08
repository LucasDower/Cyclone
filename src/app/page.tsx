"use client";

import Calendar from "@/components/slides/SlideCalendar";
import TimeDate from "@/components/slides/SlideTimeDate";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <div className="fullscreen-container">
      <Swiper>
        <SwiperSlide><TimeDate></TimeDate></SwiperSlide>
        <SwiperSlide><Calendar></Calendar></SwiperSlide>
      </Swiper>
    </div>
  )
}
