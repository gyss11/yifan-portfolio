import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style";

import {
  Navbar,
  Hero,
  Footer,
  Loading,
  AgentTerminal,
  FinetuneDashboard,
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
                <section id="coreProjects" className="sm:py-16 py-10">
                  <h1 className="font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
                    Core Projects
                  </h1>

                  {/* Project intro */}
                  <div className="mt-8 mb-10 max-w-[720px]">
                    <h2 className="font-poppins font-semibold text-[28px] ss:text-[32px] text-white leading-tight">
                      建筑工程智能检测{" "}
                      <span className="text-gradient">Agent</span>
                    </h2>
                    <p className="font-poppins font-normal text-dimWhite text-[15px] mt-2 mb-5 tracking-wide">
                      LangChain 驱动的自动化建模闭环
                    </p>
                    <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[28px]">
                      基于大模型微调与 Agent 架构，实现从自然语言指令到 OpenSees
                      结构建模代码的端到端自动生成。引入 Reflection
                      自修复机制和温度策略动态调节，将复杂工程建模任务的闭环成功率提升至
                      92%+。
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {["LangChain", "GPT-4 微调", "OpenSees", "Reflection Agent", "RAG"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono text-teal-200 border border-teal-200/30 rounded-full bg-teal-200/5"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Bento Grid: Terminal + Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                    <AgentTerminal />
                    <FinetuneDashboard />
                  </div>
                </section>

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
