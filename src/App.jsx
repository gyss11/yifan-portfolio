import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style";

import {
  Navbar,
  Hero,
  Footer,
  Loading,
} from "./components";

const SectionPlaceholder = ({ id, title, children }) => (
  <section id={id} className="sm:py-16 py-10">
    <h1 className="font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
      {title}
    </h1>
    {children}
  </section>
);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.section
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>

            <div className={`bg-primary ${styles.flexStart} pt-[80px]`}>
              <div className={`${styles.boxWidth}`}>
                <Hero />
              </div>
            </div>

            <div
              className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}
            >
              <div className={`${styles.boxWidth}`}>
                {/* About */}
                <SectionPlaceholder id="about" title="About">
                  <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[600px] mt-4">
                    这里将展示我的个人经历、核心能力与职业愿景。（v2.0 迭代填充）
                  </p>
                </SectionPlaceholder>

                {/* Core Projects */}
                <SectionPlaceholder id="coreProjects" title="Core Projects">
                  <div className="container px-2 py-10 mx-auto mb-8 min-h-[200px] border border-dashed border-gray-700 rounded-xl mt-6 flex items-center justify-center">
                    <p className="font-poppins font-normal text-dimWhite text-[16px]">
                      v2.0 — 动态数据看板与项目卡片将在此呈现
                    </p>
                  </div>
                </SectionPlaceholder>

                {/* Tech Insights */}
                <SectionPlaceholder id="techInsights" title="Tech Insights">
                  <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[600px] mt-4">
                    技术沉淀与方法论分享区。（v2.0 迭代填充）
                  </p>
                </SectionPlaceholder>

                {/* Changelog */}
                <SectionPlaceholder id="changelog" title="Changelog">
                  <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[600px] mt-4">
                    站点构建日志与版本更新记录。（v2.0 迭代填充）
                  </p>
                </SectionPlaceholder>
              </div>
            </div>

            <Footer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
