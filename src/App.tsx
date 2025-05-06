import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Process from "./components/Process/Process";
import Offices from "./components/Offices/Offices";
import Contact from "./components/Contact/Contact";
import LatestNews from "./components/LatestNews/LatestNews";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <About />
      <Projects />
      <Process />
      <Offices />
      <Contact />
      <LatestNews />
      <Footer />
    </>
  );
}

export default App;
