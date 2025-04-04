"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import {
  IconClipboard,
  IconHeadphones,
  IconImage,
  IconMusic,
  PencilIcon,
} from "@voiceai/ui/@/components/ui/icons"

interface ActionButtonsProps {
  showPlayer: boolean
  scrollToTab2: () => void
}

export const ActionButtonsVoice: React.FC<ActionButtonsProps> = ({
  showPlayer,
  scrollToTab2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showPlayer && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [showPlayer])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const buttonData = [
    {
      icon: <PencilIcon className="h-5 w-5" />,
      text: "Rewrite Your Script",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      action: () => scrollToTab2(),
      isLink: false,
    },
    // ... rest of the button data
  ]

  if (!showPlayer) return null

  return (
    <AnimatePresence>
      {showPlayer && (
        <motion.div
          ref={containerRef}
          className="mx-auto mb-12 mt-8 w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          exit={{ opacity: 0, y: -20 }}
        >
          <motion.h2
            className="mb-4 text-center text-2xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Create high-impact scripts
          </motion.h2>

          <div className="space-y-3">
            {buttonData.map((button, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {button.isLink ? (
                  <Link href={button.href || "#"} className="block">
                    <div
                      className={`flex items-center rounded-lg p-4 ${button.bgColor} transition-all hover:brightness-95`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${button.textColor} bg-white`}
                      >
                        {button.icon}
                      </div>
                      <span className={`ml-3 font-medium ${button.textColor}`}>
                        {button.text}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button onClick={button.action} className="w-full text-left">
                    <div
                      className={`flex items-center rounded-lg p-4 ${button.bgColor} transition-all hover:brightness-95`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${button.textColor} bg-white`}
                      >
                        {button.icon}
                      </div>
                      <span className={`ml-3 font-medium ${button.textColor}`}>
                        {button.text}
                      </span>
                    </div>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}