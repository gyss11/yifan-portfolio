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
  Changelog,
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
                <section id="about" className="sm:py-16 py-10">
                  <h1 className="font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
                    About Me
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className="rounded-xl border border-gray-700/50 bg-[#1a1a2e]/80 px-6 py-6 hover:border-gray-600/70 transition-colors">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-bold text-white bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
                        背景概述
                      </span>
                      <p className="font-poppins font-normal text-dimWhite text-[15px] leading-[27px]">
                        深耕 AI 领域的商业分析师与产品经理。约翰霍普金斯大学 (JHU) 商业分析与人工智能硕士在读（GPA Top 13%，院长奖学金）。
                      </p>
                    </div>
                    <div className="rounded-xl border border-gray-700/50 bg-[#1a1a2e]/80 px-6 py-6 hover:border-gray-600/70 transition-colors">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-bold text-white bg-gradient-to-r from-teal-400 to-emerald-500 mb-4">
                        核心专长
                      </span>
                      <p className="font-poppins font-normal text-dimWhite text-[15px] leading-[27px]">
                        拥有丰富的 AI 产品落地经验，涵盖大模型微调 (SFT)、LangChain Agent 架构设计、AI 数据标注平台 0→1 规划落地与 RAG 评测体系搭建。
                      </p>
                    </div>
                    <div className="rounded-xl border border-gray-700/50 bg-[#1a1a2e]/80 px-6 py-6 hover:border-gray-600/70 transition-colors">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-bold text-white bg-gradient-to-r from-violet-400 to-purple-500 mb-4">
                        产品愿景
                      </span>
                      <p className="font-poppins font-normal text-dimWhite text-[15px] leading-[27px]">
                        在工程可行性与用户体验之间寻找最优解，致力于将前沿的 LLM 技术转化为可度量、高价值的商业解决方案。
                      </p>
                    </div>
                  </div>
                </section>

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
                      基于大模型微调与 Agent 架构，实现从自然语言指令到“工程结构”建模代码的端到端自动生成。引入 Reflection
                      自修复机制和温度策略动态调节，将复杂工程建模任务的闭环成功率提升至
                      92%+。
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {["LangChain", "Qwen-Coder 微调", "OpenSees", "Reflection Agent"].map(
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
                <section id="techInsights" className="sm:py-16 py-10">
                  <h1 className="font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
                    Tech Insights
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="group rounded-xl border border-gray-700/50 bg-[#1a1a2e]/80 px-6 py-6 relative overflow-hidden hover:border-teal-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-teal-500/0 via-teal-500/0 to-sky-500/0 group-hover:from-teal-500/15 group-hover:to-sky-500/15 transition-all duration-300 pointer-events-none" />
                      <h3 className="relative font-poppins font-semibold text-white text-[20px] leading-snug mb-3">
                        RAG 评测体系闭环建设
                      </h3>
                      <div className="relative flex flex-wrap gap-2 mb-4">
                        <span className="px-2.5 py-1 text-[11px] font-mono text-teal-200/80 border border-teal-200/20 rounded-full bg-teal-200/5">LLM Evaluation</span>
                        <span className="px-2.5 py-1 text-[11px] font-mono text-teal-200/80 border border-teal-200/20 rounded-full bg-teal-200/5">Data-Driven</span>
                      </div>
                      <p className="relative font-poppins font-normal text-dimWhite text-[15px] leading-[27px]">
                        基于场景构建评测集，制定覆盖多维度的评测指标与 Badcase 分析流，驱动线上 RAG 准确率达 93%。
                      </p>
                    </div>
                    <div className="group rounded-xl border border-gray-700/50 bg-[#1a1a2e]/80 px-6 py-6 relative overflow-hidden hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-violet-500/0 via-violet-500/0 to-purple-500/0 group-hover:from-violet-500/15 group-hover:to-purple-500/15 transition-all duration-300 pointer-events-none" />
                      <h3 className="relative font-poppins font-semibold text-white text-[20px] leading-snug mb-3">
                        Agent 自修复与业务架构设计
                      </h3>
                      <div className="relative flex flex-wrap gap-2 mb-4">
                        <span className="px-2.5 py-1 text-[11px] font-mono text-teal-200/80 border border-teal-200/20 rounded-full bg-teal-200/5">Agent Workflow</span>
                        <span className="px-2.5 py-1 text-[11px] font-mono text-teal-200/80 border border-teal-200/20 rounded-full bg-teal-200/5">Architecture</span>
                      </div>
                      <p className="relative font-poppins font-normal text-dimWhite text-[15px] leading-[27px]">
                        设计"生成→执行→修复→再评测→输出"的智能体闭环，引入 Reflection 兜底机制，保障复杂工程代码生成成功率达 92.1%。
                      </p>
                    </div>
                  </div>
                </section>

                {/* Changelog */}
                <Changelog />
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
