import Hero from "../components/Homepage/Hero";
import Trusted from "../components/Homepage/Trusted";
import Categories from "../components/Homepage/Categories";
import FeaturedJobs from "../components/Homepage/FeaturedJobs";
import WhyChoose from "../components/Homepage/WhyChoose";
import Stats from "../components/Homepage/Stats";
import Testimonials from "../components/Homepage/Testimonials";
import CTA from "../components/Homepage/CTA";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <Trusted />
      <Categories />
      <FeaturedJobs />
      {/* <WhyChoose /> */}
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
}
