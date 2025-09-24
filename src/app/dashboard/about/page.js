"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Split the title into characters for the stagger animation
const titleText = "Our Story";

// Define animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.05,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

// Create a motion-enabled version of the Link component
const MotionLink = motion(Link);

export default function AboutPage() {
  return (
    <div className="flex-1 min-h-screen flex items-center justify-center p-6 md:p-10">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-pink-700 mb-6 tracking-tight">
          {titleText.split("").map((char, index) => (
            <motion.span
              key={char + "-" + index}
              className="inline-block"
              variants={textVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="space-y-6 mt-8 p-6 bg-white rounded-3xl shadow-2xl"
          variants={cardVariants}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
            variants={textVariants}
            transition={{ delay: 1 }}
          >
            Happy Flow was born from a simple idea: to empower women with knowledge about their bodies. We believe that understanding your menstrual cycle is the first step toward better health and a happier life. Our platform is designed to be a supportive companion on your journey, providing personalized tracking, valuable insights, and a community that truly cares.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
            variants={textVariants}
            transition={{ delay: 1.2 }}
          >
            We are a small team of passionate individuals dedicated to creating a safe and beautiful space for women health. With features like our personalized PCOD dietary plans, yoga suggestions, and easy-to-use cycle tracker, we aim to make managing your well-being effortless and intuitive.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <MotionLink
            href="/dashboard"
            className="inline-block bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-pink-700 hover:scale-105 transform"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.5), 0 4px 6px -2px rgba(236, 72, 153, 0.25)" }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Dashboard
          </MotionLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
