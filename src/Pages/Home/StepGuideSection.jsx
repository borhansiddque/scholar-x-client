import React from "react";
import { FaUserCheck, FaSearch, FaFileAlt, FaChartLine } from "react-icons/fa";

const steps = [
  {
    title: "Create an Account",
    description:
      "Sign up to personalize your experience and access application tools.",
    icon: <FaUserCheck className="text-blue-500 text-3xl" />,
  },
  {
    title: "Browse Scholarships",
    description:
      "Explore verified listings tailored to your field, level, and goals.",
    icon: <FaSearch className="text-green-500 text-3xl" />,
  },
  {
    title: "Submit Applications",
    description: "Upload your documents and apply directly from ScholarX.",
    icon: <FaFileAlt className="text-purple-500 text-3xl" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Stay updated with real-time application status and notifications.",
    icon: <FaChartLine className="text-yellow-500 text-3xl" />,
  },
];

const StepGuideSection = () => {
  return (
    <section className="bg-white mb-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        How ScholarX Works
      </h2>
      <div className="grid md:grid-cols-4 gap-8 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepGuideSection;
