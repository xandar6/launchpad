import styles from "./Hero.module.css";
import { GradientText } from "../animate-ui/text/gradient";
import { motion } from "framer-motion";

const textZoomOutVariants = (delay = 0) => ({
  hidden: { opacity: 0, scale: 1.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  },
});

const buttonAppearFromBottomVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

export default function HeroSectionSimpleCentred() {
  return (
    <>
      {/* Hero */}
      <section
        className={`${styles.heroSectionMasked} bg-launchpad-navy min-h-[70vh] relative z-1 flex flex-col justify-center`}>
        <div className={styles.heroOverlay}></div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px] relative z-10">
          {/* Title */}
          <div className="mx-auto mt-5 max-w-4xlxl text-center">
            <h1
              className={`scroll-m-20 tracking-tight text-white ${styles.heroTitlePoppins} flex flex-col items-center`}>
              <motion.span
                className="block text-4xl lg:text-6xl mb-1 md:mb-2 text-neutral-300 font-[var(--launchpad-poppins-font)]"
                initial="hidden"
                animate="visible"
                variants={textZoomOutVariants(0)}>
                Launch Your Web Presence with
              </motion.span>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textZoomOutVariants(0.2)}>
                <GradientText
                  text="Launchpad Web Solutions"
                  className="text-6xl lg:text-8xl"
                  gradient="linear-gradient(90deg, #7b2cbf 0%, #00b4d8 25%, #7b2cbf 50%, #00b4d8 75%, #7b2cbf 100%)"
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <motion.p
              className={`text-neutral-300 text-xl ${styles.heroDescriptionPoppins}`}
              initial="hidden"
              animate="visible"
              variants={textZoomOutVariants(0.4)}>
              Whether you're starting from scratch or leveling up, we help you
              launch fast with clean, modern digital solutions.
            </motion.p>
          </div>
          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-3">
            <motion.button
              className={styles.gradientButtonWrapper}
              initial="hidden"
              animate="visible"
              variants={buttonAppearFromBottomVariants(0.6)}>
              <span className={styles.gradientButtonContent}>Get Started</span>
            </motion.button>
          </div>
          {/* End Buttons */}
        </div>
      </section>
      {/* End Hero */}
    </>
  );
}
