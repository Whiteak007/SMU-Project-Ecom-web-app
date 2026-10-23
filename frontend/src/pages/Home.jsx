import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import NewsLetterBoxx from "../components/NewsLetterBoxx";
import Testimonial from "../components/Testmonial";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
      <NewsLetterBoxx/>
      <Testimonial/>
    </div>
  );
};

export default Home;