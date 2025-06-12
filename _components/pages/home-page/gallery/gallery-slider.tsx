"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  cssClasses?: string;
  data: string[];
}

const GallerySlider = ({ cssClasses, data }: Props) => {
  return (
    <div className="relative">
      <div className="overflow-x-hidden">
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          spaceBetween={20}
          speed={1000}
          modules={[Autoplay, Pagination, Navigation]}
          className={cssClasses}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".swiper-gallery-button-prev-custom",
            nextEl: ".swiper-gallery-button-next-custom",
          }}
          loop
          style={
            {
              "--swiper-pagination-color": "#719A94",
              "--swiper-pagination-bullet-inactive-color": "#719A94",
              "--swiper-pagination-bullet-inactive-opacity": "0.8",
            } as React.CSSProperties
          }
          breakpoints={{
            1280: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
        >
          {data.map((slide, index) => (
            <SwiperSlide key={index} className="pb-7 desktop:pb-10">
              <Image
                src={slide}
                alt={`The Lookout Centre, Plettenberg Bay - Image ${index + 1}`}
                className="rounded-none w-full h-full object-cover"
                width={1280}
                height={600}
                loading={index < 1 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="swiper-gallery-button-prev-custom hidden desktop:flex absolute left-[35%] -bottom-5 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 hover:bg-green/90 border-2 border-green rounded-full items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 shadow-lg desktop:hover:cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-green hover:text-white transition-colors duration-300" />
      </button>

      <button
        className="swiper-gallery-button-next-custom hidden desktop:flex absolute right-[35%] -bottom-5 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 hover:bg-green/90 border-2 border-green rounded-full items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 shadow-lg desktop:hover:cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-green hover:text-white transition-colors duration-300" />
      </button>
    </div>
  );
};

export default GallerySlider;
