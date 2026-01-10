import React from "react";
import Navbar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
function Landing(){
    return(
        <>
        
          <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
        </>
    );
}
export default Landing;