import React from "react";
import Container from "../../Components/Container";

const AboutUs = () => {
  return (
    <Container>
      <div className="px-6 my-10 md:my-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About ScholarX
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            ScholarX is a cutting-edge scholarship management platform designed
            to make finding, applying for, and managing scholarships easier than ever.
            Our goal is to bridge the gap between opportunity and accessibility—
            helping students achieve their dreams without financial obstacles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              🎯 Our Mission
            </h2>
            <p className="text-gray-700">
              To empower students around the world by providing access to
              educational funding that aligns with their passions and potential.
              We believe financial limitations should never hinder educational success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              🚀 What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Curated scholarship listings for diverse fields & locations</li>
              <li>Secure, role-based dashboards for students and administrators</li>
              <li>Progress tracking, deadlines, and real-time notifications</li>
              <li>Fast, accessible design across all devices</li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">
              💡 Our Values
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Equity:</strong> Making opportunities accessible to all students.</li>
              <li><strong>Transparency:</strong> Clear processes and honest communication.</li>
              <li><strong>Innovation:</strong> Using technology to simplify scholarship access.</li>
              <li><strong>Community:</strong> Supporting a global network of learners and educators.</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
