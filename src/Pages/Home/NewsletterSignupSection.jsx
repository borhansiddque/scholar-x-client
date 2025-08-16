import React, { useState } from "react";

const NewsletterSignupSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your newsletter signup logic here (e.g. API call)
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-blue-500 text-white py-16 px-6 rounded-2xl mb-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
      <p className="mb-6">
        Subscribe to our newsletter to get the latest scholarships and updates.
      </p>
      {submitted ? (
        <p className="text-green-300 font-semibold">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded px-4 py-2 border outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
};

export default NewsletterSignupSection;
