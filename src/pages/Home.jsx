import React from "react";
import Hero from "../sections/Hero";
import WhyChoose from "../sections/WhyChoose";
import Testimonial from "../sections/Testimonial";
import Services from "../sections/Services";
import Pricing from "../sections/Pricing"; // Make sure to rename Pricinge.jsx to Pricing.jsx
import Gallery from "../sections/Gallery";
import { Contact } from "lucide-react";

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyChoose />
      <Testimonial />
      <Services />
      <Pricing />
      <Gallery />
    </main>
  );
};
