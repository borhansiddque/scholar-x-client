import React from "react";
import Container from "../../Components/Container";
import TestimonialSection from "./TestimonialSection";
import StepGuideSection from "./StepGuideSection";
import TopScholarships from "./TopScholarships";
import Banner from "./Banner";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import NewsletterSignupSection from "./NewsletterSignupSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <Container>
        <TopScholarships />
        <TestimonialSection />
        <StepGuideSection />
        <FeaturesSection/>
        <CTASection />
        <FAQSection />
        <NewsletterSignupSection/>
      </Container>
    </div>
  );
};

export default Home;
