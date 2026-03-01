import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const rawData = [
  { name: "Pass Rate", baseline: 50, finetuned: 87.2, label: "代码输出通过率" },
  { name: "Instruction", baseline: 65, finetuned: 94, label: "复杂指令遵循度" },
  { name: "Stability", baseline: 45, finetuned: 92, label: "闭环执行稳定性" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const item = rawData.find((d) => d.name === label);
  return (
    <div className="bg-[#1e1e30] border border-gray-600/50 rounded-lg px-4 py-3 shadow-xl font-mono text-sm">
      <p className="text-white font-semibold mb-2">{item?.label || label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="mb-0.5 text-sm text-gray-400"
        >
          {entry.dataKey === "baseline" ? "Baseline" : "微调后"}：{entry.value}%
        </p>
      ))}
      {payload.length === 2 && (
        <p className="text-emerald-400 mt-1.5 pt-1.5 border-t border-gray-600/40 font-semibold">
          提升 +{(payload[1].value - payload[0].value).toFixed(1)}%
        </p>
      )}
    </div>
  );
};

const FinetuneDashboard = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const data = rawData.map((d) => ({
    ...d,
    baseline: animate ? d.baseline : 0,
    finetuned: animate ? d.finetuned : 0,
  }));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full rounded-xl overflow-hidden border border-gray-700/50 bg-[#1a1a2e] shadow-2xl shadow-black/50 relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-teal-500/20 via-transparent to-sky-500/20 pointer-events-none" />

      {/* Header */}
      <div className="relative px-6 pt-5 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-poppins font-semibold text-white text-[18px] sm:text-[20px]">
            大模型微调 (SFT) 性能对比
          </h3>
          <p className="font-mono text-gray-500 text-xs mt-1">
            LLaMA-Factory · LoRA · Domain-Specific SFT
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">
          Pass Rate +37.2%
        </span>
      </div>

      {/* Chart */}
      <div className="relative px-2 sm:px-4 pb-6">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            barGap={6}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 12, fontFamily: "monospace" }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={45}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="baseline"
              name="Baseline"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((_, i) => (
                <Cell key={`base-${i}`} fill="#334155" />
              ))}
            </Bar>
            <Bar
              dataKey="finetuned"
              name="微调后"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            >
              {data.map((_, i) => (
                <Cell key={`ft-${i}`} fill="url(#tealGradient)" />
              ))}
            </Bar>
            <defs>
              <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={1} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.85} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-2 font-mono text-xs">
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm bg-[#334155]" />
            <span className="text-gray-400">Baseline 模型</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm bg-gradient-to-b from-teal-400 to-sky-500" />
            <span className="text-gray-400">微调后模型</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FinetuneDashboard;
