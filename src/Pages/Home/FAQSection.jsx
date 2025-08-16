import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I apply for scholarships on ScholarX?",
    answer:
      "Create an account, complete your profile, and browse available scholarships. When you find one you're eligible for, follow the application steps provided.",
  },
  {
    question: "Is ScholarX free to use?",
    answer:
      "Yes! ScholarX is completely free for students. You can search, apply, and track scholarships without any cost.",
  },
  {
    question: "Can I save scholarships to apply later?",
    answer:
      "Absolutely. You can bookmark scholarships you're interested in and revisit them from your dashboard anytime.",
  },
  {
    question: "Who can use ScholarX?",
    answer:
      "ScholarX is designed for high school and college students worldwide looking for scholarship opportunities.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6 mb-20 rounded-2xl border border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Got questions? We've got answers.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{faq.question}</h3>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              {activeIndex === index && (
                <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
