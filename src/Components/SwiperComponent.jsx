// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
  return (
    <div className="flex justify-center items-center">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="w-full max-w-lg"
      >
        <SwiperSlide>
          <div className="bg-white p-6 rounded-lg shadow-lg w-60 md:w-80 mx-auto mb-[54px]">
            <p className="text-gray-600 mb-4">
              "GitForge made my GitHub profile creation simple and effective. The
              Markdown export feature is a lifesaver!"
            </p>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-sm text-gray-500">Full-Stack Developer</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white p-6 rounded-lg shadow-lg w-60 md:w-80 mx-auto mb-[54px]">
            <p className="text-gray-600 mb-4">
              "I love the live preview feature. It lets me see my changes
              instantly, making the process seamless."
            </p>
            <h4 className="font-semibold">Jane Smith</h4>
            <p className="text-sm text-gray-500">Data Scientist</p>
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
};
