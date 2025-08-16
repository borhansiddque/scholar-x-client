import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="bg-blue-500 text-white py-16 px-6 rounded-2xl mb-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to unlock your future?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of students using ScholarX to discover and win the
          scholarships that match their dreams.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
          >
            Get Started <FaArrowRight />
          </Link>

          <Link
            to="/scholarships"
            className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Browse Scholarships
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
