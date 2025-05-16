import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Process from "./components/Process/Process";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
