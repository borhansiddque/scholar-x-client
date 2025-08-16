import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        swipeable
      >
        {/* Slide 1 */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg"
            alt="ScholarX Slide 1"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-black/50 text-white">
            <h2 className="text-white text-3xl md:text-5xl font-bold">
              Unlock Your Potential with ScholarX
            </h2>
            <p className="w-[80%] md:w-[50%] lg:w-[40%] mt-5 md:mt-7 text-lg">
              Explore a centralized platform for discovering scholarships,
              tracking applications, and unlocking opportunities that shape your
              future.
            </p>
            <Link
              to={"/about"}
              className="btn border-none bg-blue-500 hover:bg-blue-600 text-white px-6 transition-all duration-300 shadow-none hover:shadow-md hover:shadow-blue-600 mt-10"
            >
              About ScholarX
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg"
            alt="ScholarX Slide 2"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-black/50 text-white">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
              Bridging Dreams and Education
            </h2>
            <p className="w-[80%] md:w-[50%] lg:w-[40%] mt-5 md:mt-7 text-lg">
              ScholarX connects ambition with financial support—helping students
              pursue education without the burden of funding barriers.
            </p>
            <Link
              to={"/scholarships"}
              className="btn border-none bg-blue-500 hover:bg-blue-600 text-white px-6 transition-all duration-300 shadow-none hover:shadow-md hover:shadow-blue-600 mt-10"
            >
              Explore Scholarships
            </Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg"
            alt="ScholarX Slide 3"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-black/50 text-white">
            <h2 className="text-white text-3xl md:text-5xl font-bold">
              Where Talent Meets Opportunity
            </h2>
            <p className="w-[80%] md:w-[50%] lg:w-[40%] mt-5 md:mt-7 text-lg">
              Join a vibrant community of learners who are turning aspirations
              into achievements with the help of meaningful scholarships.
            </p>
            <Link
              to={"/contact-us"}
              className="btn border-none bg-blue-500 hover:bg-blue-600 text-white px-6 transition-all duration-300 shadow-none hover:shadow-md hover:shadow-blue-600 mt-10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
