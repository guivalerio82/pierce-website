'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const goals = [
  "learn how to play the guitar",
  "save money",
  "get promoted",
  "learn to code",
  "learn Spanish",
  "run half a marathon under 2 hours",
  "read more books",
  "build an app",
  "stop vaping",
  "get a new job",
  "get ready for a mortgage"
]

export const RotatingGoals = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % goals.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex items-center px-2 relative overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ 
            y: { type: "tween", duration: 0.5 },
            opacity: { duration: 0.3 }
          }}
          className="inline-block text-[#5ba88e] underline decoration-[#5ba88e] underline-offset-4 decoration-2 align-baseline"
        >
          {goals[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
} 