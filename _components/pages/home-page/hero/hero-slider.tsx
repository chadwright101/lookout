"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";

interface Props {
  cssClasses?: string;
  data: string[];
}

const HeroSlider = ({ cssClasses, data }: Props) => {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
      }}
      spaceBetween={12}
      speed={1000}
      modules={[Autoplay, Pagination, EffectFade, Navigation]}
      className={cssClasses}
      effect="fade"
      pagination={{
        dynamicBullets: true,
      }}
      loop
      style={
        {
          "--swiper-pagination-color": "#719A94",
          "--swiper-pagination-bullet-inactive-color": "#719A94",
          "--swiper-pagination-bullet-inactive-opacity": "0.8",
        } as React.CSSProperties
      }
    >
      {data.map((slide, index) => (
        <SwiperSlide key={index} className="pb-7">
          <Image
            src={slide}
            alt={`The Lookout Centre - Plettenberg Bay | Image ${index + 1}`}
            className="w-full h-full object-cover"
            width={1280}
            height={600}
            loading={index < 1 ? "eager" : "lazy"}
            sizes="(max-width: 600px) 150vw, 100vw"
            quality={75}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
