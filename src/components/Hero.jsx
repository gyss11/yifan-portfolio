import { useState, useEffect, useCallback } from "react";
import styles from "../style";
import { aboutMe } from "../constants";
import { scrollToSection } from "../lib/helperFunctions";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import animationData from "../lotties/person-coding.json";

const defaultOptions = {
  loop: true,
  play: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const typingRoles = [
  "AI Product Manager",
  "Agent Workflow Designer",
  "Data-Driven Problem Solver",
];

const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 1800) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      setText(currentWord.substring(0, text.length + 1));
      if (text.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      setText(currentWord.substring(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, wordIndex, isDeleting, words, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return text;
};

const Hero = () => {
  const displayText = useTypewriter(typingRoles);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col w-full"
        >
          <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[80px] leading-[80px]">
            Hi, I'm Yifan.
          </h1>

          <div className="mt-4 h-[40px] flex items-center">
            <span className="font-poppins font-semibold ss:text-[28px] text-[22px] text-gradient">
              {displayText}
            </span>
            <span className="font-poppins font-light ss:text-[28px] text-[22px] text-teal-200 animate-pulse ml-[2px]">
              |
            </span>
          </div>

          <p className={`${styles.paragraph} max-w-[470px] mt-6`}>
            {aboutMe.intro}
          </p>

          <div className="flex flex-row items-center mt-8 gap-4">
            <button
              onClick={() => scrollToSection("coreProjects")}
              className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[14px] text-primary outline-none rounded cursor-pointer hover:opacity-90 transition-opacity"
            >
              查看核心项目
            </button>
            <a href="/Yifan_Resume.pdf" download target="_blank" rel="noopener noreferrer" className="py-3 px-6 border border-teal-200 font-poppins font-medium text-[14px] text-teal-200 rounded hover:bg-teal-200 hover:text-primary transition-all">
              下载简历
            </a>
          </div>
        </motion.div>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <div className="relative z-index-[5] h-[90%] w-[85%]">
          <Lottie {...defaultOptions} />
        </div>
        <div className="absolute z-[1] w-[50%] h-[50%] rounded-full bottom-40 white__gradient"></div>
      </div>
    </section>
  );
};

export default Hero;
