import Explore from "@/components/sections/Explore";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import TechStack from "@/components/sections/TechStack";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <Explore />
      <Footer/>
    </div>
  );
};
export default HomePage;
