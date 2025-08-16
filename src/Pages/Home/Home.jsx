import React from "react";
import Container from "../../Components/Container";
import TestimonialSection from "./TestimonialSection";
import StepGuideSection from "./StepGuideSection";
import TopScholarships from "./TopScholarships";
import Banner from "./Banner";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <Container>
        <TopScholarships />
        <TestimonialSection />
        <StepGuideSection />
        <CTASection />
        <FAQSection />
      </Container>
    </div>
  );
};

export default Home;
