"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0" }}
          exit={{ x: "-100%" }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
