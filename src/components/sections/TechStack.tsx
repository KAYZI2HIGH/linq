'use client'
import { techStack } from "@/lib/constant";
import {motion} from 'motion/react'

const COLOR = [
  "#000000",
  "#A855F7",
  "#EF4444",
  "#22C55E",
  "#2563EB",
  "#111827",
];

const TechStack = () => {
  return (
    <section id='stack' className="space-y-6 flex flex-col justify-center items-center py-10">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
          Tech Stack
        </h1>
        <p className="text-[14px] md:text-lg max-w-[700px] w-full mx-auto md:font-medium font-light text-gray-600 text-center">
          These are the technologies used when building Linq
        </p>
      </div>
      <div className="max-w-[600px] w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-12">
        {techStack.map((tech, idx) => {
          const stackColor = COLOR[idx];

          return (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center gap-4 w-full mx-auto"
              whileHover={{
                scale: 1.12,
                rotate: 2,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
            >
              <motion.div
                className="size-14 rounded-full p-3 shadow-md"
                style={{ backgroundColor: stackColor }}
                whileHover={{
                  boxShadow: "0px 0px 18px rgba(0,0,0,0.2)",
                  rotate: -3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <tech.icon className="size-full text-white" />
              </motion.div>

              <h3 className="tracking-wide font-medium md:text-[16px]">
                {tech.title}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
