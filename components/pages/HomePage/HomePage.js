import React from "react";

import Page from "@/components/Elements/Page/Page";
import Header from "@/components/layout/Header/Header";
import ProblemSection from "./ProblemSection/ProblemSection";
import SolutionSection from "./SolutionSection/SolutionSection";
import CtaSection from "./CtaSection/CtaSection";
import InfoSection from "./InfoSection/InfoSection";
import CoursesSection from "./CoursesSection/CoursesSection";

const HomePage = () => {
  return (
    <Page title="Home" absoluteNav>
      <Header />
      <ProblemSection />
      <SolutionSection />
      <CoursesSection />
      <CtaSection />
      <InfoSection />

      {/* 
        header
        Problem section
        solution section
        courses slider?
        cta section
        info section
      */}
    </Page>
  );
};

export default HomePage;
