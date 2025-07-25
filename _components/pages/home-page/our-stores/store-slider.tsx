"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import SingleStoreComponent, { StoreProps } from "./single-store-component";
import { StorePopup } from "./truncated-paragraph";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface Props {
  cssClasses?: string;
  data: StoreProps["store"][];
}

const StoreSlider = ({ cssClasses, data }: Props) => {
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
  const [activePopUpIndex, setActivePopUpIndex] = useState<number | null>(null);
  const [contactInteractionIndex, setContactInteractionIndex] = useState<
    number | null
  >(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredData = data
    .filter((store) => store.image && store.image.trim() !== "")
    .sort((a, b) => {
      const aHasParagraphs = a.paragraphs && a.paragraphs.length > 0;
      const bHasParagraphs = b.paragraphs && b.paragraphs.length > 0;

      if (aHasParagraphs && !bHasParagraphs) return -1;
      if (!aHasParagraphs && bHasParagraphs) return 1;

      return a.name.localeCompare(b.name);
    });

  useEffect(() => {
    if (swiperRef.current) {
      if (activePopUpIndex !== null || contactInteractionIndex !== null) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  }, [activePopUpIndex, contactInteractionIndex]);

  const handleDisabledSlideClick = (clickedIndex: number) => {
    if (!swiperRef.current || visibleSlides.length < 4) return;

    const currentFirstIndex = visibleSlides[0];
    const currentLastIndex = visibleSlides[3];

    if (clickedIndex === currentFirstIndex) {
      swiperRef.current.slidePrev();
    } else if (clickedIndex === currentLastIndex) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="relative desktop:px-16">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        spaceBetween={20}
        speed={1000}
        modules={[Autoplay, Pagination, Navigation]}
        className={cssClasses}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        loop
        initialSlide={filteredData.length - 1}
        style={
          {
            "--swiper-pagination-color": "#719A94",
            "--swiper-pagination-bullet-inactive-color": "#719A94",
            "--swiper-pagination-bullet-inactive-opacity": "0.8",
          } as React.CSSProperties
        }
        breakpoints={{
          800: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        onSlideChange={(swiper) => {
          const rawSlidesPerView = swiper.params.slidesPerView;
          const slidesPerView =
            typeof rawSlidesPerView === "number" ? rawSlidesPerView : 1;
          const newVisibleSlides = [
            swiper.realIndex,
            ...Array(Math.max(0, slidesPerView - 1))
              .fill(0)
              .map((_, i) => swiper.realIndex + i + 1),
          ].map((i) => i % filteredData.length);

          setVisibleSlides(newVisibleSlides);
        }}
      >
        {filteredData.map((store, index) => (
          <SwiperSlide key={index} className="pb-7 desktop:pb-10">
            <SingleStoreComponent
              store={store}
              isOutsideSlide={
                !visibleSlides.includes(index) ||
                (visibleSlides.length >= 4 &&
                  (index === visibleSlides[0] || index === visibleSlides[3]))
              }
              isDisabled={
                visibleSlides.length >= 4 &&
                (index === visibleSlides[0] || index === visibleSlides[3])
              }
              setShowPopUp={(show: boolean) =>
                setActivePopUpIndex(show ? index : null)
              }
              showPopUp={activePopUpIndex === index}
              onDisabledClick={() => handleDisabledSlideClick(index)}
              onContactInteraction={(isInteracting: boolean) =>
                setContactInteractionIndex(isInteracting ? index : null)
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/*  desktop navigation */}
      <button
        className="swiper-button-prev-custom hidden desktop:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-green/90 border-2 border-green rounded-full items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 shadow-lg desktop:hover:cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-green hover:text-white transition-colors duration-300" />
      </button>

      <button
        className="swiper-button-next-custom hidden desktop:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-green/90 border-2 border-green rounded-full items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 shadow-lg desktop:hover:cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-green hover:text-white transition-colors duration-300" />
      </button>

      {/* Render popup at slider level for mobile only */}
      <StorePopup
        showPopUp={activePopUpIndex !== null}
        setShowPopUp={(show: boolean) =>
          setActivePopUpIndex(show ? activePopUpIndex : null)
        }
        storeName={
          activePopUpIndex !== null
            ? filteredData[activePopUpIndex]?.name
            : undefined
        }
        paragraphs={
          activePopUpIndex !== null
            ? filteredData[activePopUpIndex]?.paragraphs
            : undefined
        }
      />
    </div>
  );
};

export default StoreSlider;
