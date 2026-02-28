import styles from "../style";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      id="loading"
      className={`w-[100vw] h-[100vh] flex ${styles.flexCenter}`}
      initial={{ scale: 1.0, opacity: 0.25 }}
      animate={{ scale: 2.0, opacity: 0.8 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
    >
      <div className="flex flex-col items-center text-center">
        <span className="font-poppins font-bold text-white text-[20px] leading-tight">
          毛逸凡
        </span>
        <span className="font-poppins font-medium text-gradient text-[14px] mt-1">
          Yifan Mao
        </span>
      </div>
    </motion.div>
  );
};

export default Loading;
