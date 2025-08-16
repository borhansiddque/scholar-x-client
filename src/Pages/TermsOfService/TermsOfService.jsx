import React from "react";
import Container from "../../Components/Container";
import {
  FaCheckCircle,
  FaUserShield,
  FaLaptopCode,
  FaCopyright,
  FaBan,
  FaExclamationTriangle,
  FaSyncAlt,
} from "react-icons/fa";

const terms = [
  {
    icon: <FaCheckCircle className="text-blue-600 text-2xl" />,
    title: "Acceptance of Terms",
    description:
      "By accessing or using ScholarX, you agree to comply with and be legally bound by these Terms of Service and our Privacy Policy.",
  },
  {
    icon: <FaUserShield className="text-green-600 text-2xl" />,
    title: "User Accounts",
    description:
      "You are responsible for your login credentials and activities on your account. Provide accurate and complete information when registering.",
  },
  {
    icon: <FaLaptopCode className="text-purple-600 text-2xl" />,
    title: "Use of the Platform",
    description:
      "Use ScholarX only for lawful purposes. Do not attempt to harm, disable, or gain unauthorized access to any part of the platform.",
  },
  {
    icon: <FaCopyright className="text-yellow-600 text-2xl" />,
    title: "Intellectual Property",
    description:
      "All content and technology on ScholarX are protected. You may not copy or distribute any part of the platform without permission.",
  },
  {
    icon: <FaBan className="text-red-600 text-2xl" />,
    title: "Termination",
    description:
      "We may suspend or terminate your access to ScholarX for conduct that violates these Terms or is harmful to others or the platform.",
  },
  {
    icon: <FaExclamationTriangle className="text-gray-700 text-2xl" />,
    title: "Disclaimer & Liability",
    description:
      'ScholarX is provided "as is" without warranties. We are not liable for damages or inaccuracies in scholarship listings.',
  },
  {
    icon: <FaSyncAlt className="text-indigo-600 text-2xl" />,
    title: "Changes to Terms",
    description:
      "We may update these Terms at any time. Continued use of the platform means you accept the updated terms.",
  },
];

const TermsOfService = () => {
  return (
    <Container>
      <div className="px-6 my-10 md:my-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read our terms carefully. By using ScholarX, you agree to the
            conditions outlined below.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {terms.map((term, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div>{term.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {term.title}
                </h2>
                <p className="text-gray-600 text-sm">{term.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-12 text-center">
          Last updated: August 17, 2025
        </p>
      </div>
    </Container>
  );
};

export default TermsOfService;
