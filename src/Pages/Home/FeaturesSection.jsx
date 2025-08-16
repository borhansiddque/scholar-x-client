import React from "react";

const features = [
  {
    icon: "🎓",
    title: "Wide Range of Scholarships",
    description: "Access scholarships from top universities worldwide."
  },
  {
    icon: "⚡",
    title: "Fast Application Process",
    description: "Easy and quick applications with transparent deadlines."
  },
  {
    icon: "💡",
    title: "Personalized Recommendations",
    description: "Find scholarships that perfectly fit your profile."
  }
];

const FeaturesSection = () => {
  return (
    <section className="my-20 text-center px-4">
      <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
