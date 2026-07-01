import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Support from "@/components/Support";
import Main from "@/components/Main";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      
      <Support />
      <Main />
      <Footer />
    </>
  );
}