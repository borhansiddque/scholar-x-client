import React from "react";
import Container from "../../Components/Container";
import TestimonialSection from "./TestimonialSection";
import StepGuideSection from "./StepGuideSection";
import TopScholarships from "./TopScholarships";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Container>
        <TopScholarships />
        <TestimonialSection />
        <StepGuideSection />
      </Container>
    </div>
  );
};

export default Home;
