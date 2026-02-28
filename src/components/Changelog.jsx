import { motion } from "framer-motion";

const timelineData = [
  {
    version: "v1.0",
    phase: "MVP 期",
    title: "产品定义与骨架重构",
    description:
      "通过结构化全局 Prompt，引导 AI 剥离开源模板冗余代码，重构网站基础路由与个人品牌信息。体现最小可行性产品（MVP）的快速验证思维。",
    tags: ["Prompt Engineering", "MVP 思维"],
    color: "from-sky-400 to-blue-500",
    dot: "bg-sky-400",
    glow: "shadow-sky-500/40",
  },
  {
    version: "v2.0",
    phase: "增量爆发期",
    title: "硬核业务的 UI 组件化",
    description:
      "打破静态模板限制，利用自然语言引导大模型手写了动态模拟终端 (Agent Terminal) 与微调数据可视化看板 (Finetune Dashboard)，将复杂的“工程结构”建模代码生成流程与评测指标直观呈现。",
    tags: ["AI Coding", "数据可视化", "UX 设计"],
    color: "from-teal-400 to-emerald-500",
    dot: "bg-teal-400",
    glow: "shadow-teal-500/40",
  },
  {
    version: "v3.0",
    phase: "交付打磨期",
    title: "体验对齐与全端适配",
    description:
      "基于真实用户的浏览路径，进行移动端响应式（Responsive）重构与深色模式打磨，确保最终交付物的商业级专业度。",
    tags: ["产品审美", "细节打磨"],
    color: "from-violet-400 to-purple-500",
    dot: "bg-violet-400",
    glow: "shadow-violet-500/40",
  },
];

const TimelineNode = ({ item, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
    className="relative pl-10 sm:pl-14 pb-12 last:pb-0 group"
  >
    {/* Vertical line */}
    {!isLast && (
      <div className="absolute left-[15px] sm:left-[23px] top-[20px] bottom-0 w-px bg-gradient-to-b from-gray-600 to-gray-800" />
    )}

    {/* Dot */}
    <div
      className={`absolute left-[8px] sm:left-[16px] top-[6px] w-[15px] h-[15px] rounded-full ${item.dot} shadow-lg ${item.glow} ring-4 ring-[#1a1a2e] z-10`}
    />

    {/* Card */}
    <div className="rounded-xl border border-gray-700/50 bg-[#1a1a2e]/80 px-5 sm:px-6 py-5 hover:border-gray-600/70 transition-colors">
      {/* Version badge + phase */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-bold text-white bg-gradient-to-r ${item.color}`}
        >
          {item.version}
        </span>
        <span className="font-mono text-gray-500 text-xs">{item.phase}</span>
      </div>

      {/* Title */}
      <h3 className="font-poppins font-semibold text-white text-[18px] sm:text-[20px] leading-snug mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="font-poppins font-normal text-dimWhite text-[14px] sm:text-[15px] leading-[26px] mb-4">
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[11px] font-mono text-teal-200/80 border border-teal-200/20 rounded-full bg-teal-200/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Changelog = () => {
  return (
    <section id="changelog" className="sm:py-16 py-10">
      <h1 className="font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
        Changelog
      </h1>
      <p className="font-poppins font-normal text-dimWhite text-[16px] mt-2 mb-10 max-w-[540px]">
        从零到一的构建过程，每个版本迭代都是产品思维的具象化。
      </p>

      <div className="relative max-w-[680px]">
        {timelineData.map((item, index) => (
          <TimelineNode
            key={item.version}
            item={item}
            index={index}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Changelog;
