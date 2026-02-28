import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const terminalSteps = [
  {
    prefix: "❯",
    text: '用户指令: 帮我生成并执行一段 OpenSees 代码，用于模拟一根悬臂柱在水平循环荷载下的响应。',
    color: "text-sky-400",
    delay: 600,
    speed: 35,
  },
  {
    prefix: "⚙",
    text: "系统: 解析意图完毕... 正在调用微调后的大模型生成结构建模代码...",
    color: "text-gray-400",
    delay: 800,
    speed: 30,
  },
  {
    prefix: "⚠",
    text: "警告: 执行失败！捕捉到 OpenSees 节点定义语法错误。触发 Reflection 自修复机制...",
    color: "text-yellow-400",
    delay: 1000,
    speed: 30,
  },
  {
    prefix: "⚙",
    text: "系统: 温度策略调整，代码约束应用。自动修复完成，重新执行中...",
    color: "text-gray-400",
    delay: 800,
    speed: 30,
  },
  {
    prefix: "✔",
    text: "成功: 执行通过！输出力-位移滞回曲线数据。当前复杂任务闭环成功率: 92.1%",
    color: "text-emerald-400 font-bold",
    delay: 600,
    speed: 35,
  },
];

const AgentTerminal = () => {
  const [lines, setLines] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const terminalRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || currentStep >= terminalSteps.length) return;

    const step = terminalSteps[currentStep];
    const timer = setTimeout(() => {
      setIsTyping(true);
      setCurrentText("");
    }, step.delay);

    return () => clearTimeout(timer);
  }, [started, currentStep]);

  useEffect(() => {
    if (!isTyping || currentStep >= terminalSteps.length) return;

    const step = terminalSteps[currentStep];
    const fullText = step.text;

    if (currentText.length < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, step.speed);
      return () => clearTimeout(timer);
    }

    setLines((prev) => [...prev, { ...step, text: fullText }]);
    setCurrentText("");
    setIsTyping(false);
    setCurrentStep((prev) => prev + 1);
  }, [isTyping, currentText, currentStep]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentText]);

  const allDone = currentStep >= terminalSteps.length && !isTyping;

  return (
    <div ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-700/50"
      >
        {/* Title Bar */}
        <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-gray-700/50">
          <div className="flex gap-2 mr-4">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-gray-400 text-xs font-mono flex-1 text-center -ml-8">
            agent-workflow.sh
          </span>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="bg-[#1a1a2e] px-5 py-4 font-mono text-sm leading-relaxed min-h-[240px] max-h-[360px] overflow-y-auto"
        >
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} mb-3`}>
              <span className="opacity-60 mr-2">{line.prefix}</span>
              {line.text}
            </div>
          ))}

          {isTyping && currentStep < terminalSteps.length && (
            <div className={`${terminalSteps[currentStep].color} mb-3`}>
              <span className="opacity-60 mr-2">
                {terminalSteps[currentStep].prefix}
              </span>
              {currentText}
              <span className="inline-block w-[8px] h-[14px] bg-current ml-[1px] animate-pulse align-middle" />
            </div>
          )}

          {!started && (
            <div className="text-gray-600 flex items-center gap-2">
              <span className="opacity-60">❯</span>
              <span className="inline-block w-[8px] h-[14px] bg-gray-600 animate-pulse" />
            </div>
          )}

          {allDone && (
            <div className="text-gray-500 mt-2 flex items-center gap-2">
              <span className="opacity-60">❯</span>
              <span className="inline-block w-[8px] h-[14px] bg-gray-500 animate-pulse" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AgentTerminal;
