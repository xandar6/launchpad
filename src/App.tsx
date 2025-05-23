import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react"; // Import useEffect
import ScrollToTop from "./components/utils/ScrollToTop"; // Import ScrollToTop
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Process from "./components/Process/Process";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ServicesPage from "./pages/ServicesPage"; // Import the ServicesPage

// Layout for the main content (home page)
const MainLayout = () => (
  <main className="flex-grow flex flex-col">
    <Hero />
    <Intro />
    <section id="About">
      <About />
    </section>
    <section id="Project">
      <Projects />
    </section>
    <Process />
    <section id="Contact">
      <Contact />
    </section>
  </main>
);

// Component to handle scroll-to-hash logic
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove #
      // Use a timeout to ensure the element is rendered, especially after route changes
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Adjust delay as needed, 0 might work in some cases
    }
  }, [location.pathname, location.hash]); // Re-run effect if path or hash changes

  return null; // This component doesn't render anything
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <ScrollHandler /> {/* Add the scroll handler component here */}
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
