import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Ayesha Rahman",
    quote:
      "ScholarX helped me find the perfect scholarship for my research degree.",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Tanvir Alam",
    quote:
      "Thanks to ScholarX, I secured funding for my engineering studies abroad.",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Monir Alam",
    quote:
      "Thanks to ScholarX, I secured funding for my engineering studies abroad.",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Nazia Hasan",
    quote: "ScholarX made the application process smooth and stress-free!",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const TestimonialSection = () => (
  <section className="bg-white my-20 px-4 md:px-20 ">
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
      Hear From Our Scholars
    </h2>
    <Swiper
      loop
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
    >
      {testimonials.map((t, index) => (
        <SwiperSlide key={index}>
          <div className="bg-gray-50 p-6 rounded shadow text-center border border-gray-200">
            <img
              src={t.photo}
              alt={t.name}
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <p className="text-gray-700 italic">“{t.quote}”</p>
            <h4 className="my-4 text-lg font-semibold text-blue-600">
              {t.name}
            </h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default TestimonialSection;
