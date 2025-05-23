import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ScrollToTop from "./components/utils/ScrollToTop";
import ErrorBoundary from "./components/utils/ErrorBoundary";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Lazy load components for better performance
const Hero = lazy(() => import("./components/Hero/Hero"));
const Intro = lazy(() => import("./components/Intro/Intro"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Process = lazy(() => import("./components/Process/Process"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--launchpad-blue)]"></div>
  </div>
);

// Layout for the main content (home page)
const MainLayout = () => (
  <main className="flex flex-col flex-grow">
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
    </ErrorBoundary>

    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Intro />
      </Suspense>
    </ErrorBoundary>

    <section id="About">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
      </ErrorBoundary>
    </section>

    <section id="Project">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Projects />
        </Suspense>
      </ErrorBoundary>
    </section>

    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Process />
      </Suspense>
    </ErrorBoundary>

    <section id="Contact">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </ErrorBoundary>
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
      <ScrollToTop />
      <ScrollHandler />
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route
              path="/services"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <ServicesPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Routes>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
