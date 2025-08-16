import React from "react";
import Container from "../../Components/Container";
import {
  FaUserAlt,
  FaLock,
  FaShareAlt,
  FaShieldAlt,
  FaUserEdit,
  FaSyncAlt,
} from "react-icons/fa";

const policies = [
  {
    icon: <FaUserAlt className="text-blue-600 text-2xl" />,
    title: "Information We Collect",
    description:
      "We collect personal data such as your name, email, academic background, and application documents when you use ScholarX.",
  },
  {
    icon: <FaLock className="text-green-600 text-2xl" />,
    title: "How We Use Your Information",
    description:
      "Your data helps us manage applications, improve your experience, send notifications, and ensure platform security.",
  },
  {
    icon: <FaShareAlt className="text-purple-600 text-2xl" />,
    title: "Sharing of Information",
    description:
      "We don’t sell your data. We may share it with trusted partners or scholarship providers only when necessary for functionality or legal compliance.",
  },
  {
    icon: <FaShieldAlt className="text-yellow-600 text-2xl" />,
    title: "Data Security",
    description:
      "We use strong security measures to protect your information, but no system is 100% secure. Keep your credentials safe.",
  },
  {
    icon: <FaUserEdit className="text-red-600 text-2xl" />,
    title: "Your Rights",
    description:
      "You can access, update, or delete your data at any time. Contact us at support@scholarx.com to make changes.",
  },
  {
    icon: <FaSyncAlt className="text-indigo-600 text-2xl" />,
    title: "Policy Updates",
    description:
      "We may update this policy periodically. We'll notify you of major changes, and the latest version will always be on this page.",
  },
];

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="px-6 my-10 md:my-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how ScholarX collects, uses, and protects your personal
            information while ensuring your privacy is always respected.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div>{policy.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {policy.title}
                </h2>
                <p className="text-gray-600 text-sm">{policy.description}</p>
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

export default PrivacyPolicy;
