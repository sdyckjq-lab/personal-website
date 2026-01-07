"use client"

import { motion, type Variants, useReducedMotion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

// ============================================
// 动画变体预设
// ============================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// ============================================
// 通用动画包装组件
// ============================================

interface AnimatedProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

// 淡入上移动画
export function FadeInUp({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.5,
  once = true 
}: AnimatedProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 淡入缩放动画
export function ScaleIn({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.5,
  once = true 
}: AnimatedProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 交错子元素动画容器
interface StaggerContainerProps extends AnimatedProps {
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = "", 
  delay = 0,
  staggerDelay = 0.1,
  once = true 
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 交错子元素
export function StaggerItem({ 
  children, 
  className = "", 
  duration = 0.5 
}: Omit<AnimatedProps, 'delay' | 'once'>) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 特殊效果动画
// ============================================

// 霓虹发光Hover效果
interface NeonHoverProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function NeonHover({ 
  children, 
  className = "",
  glowColor = "rgba(0, 217, 255, 0.5)"
}: NeonHoverProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// 打字机效果
interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export function Typewriter({ 
  text, 
  className = "", 
  delay = 0,
  speed = 0.05 
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// 页面进入动画
export function PageTransition({ children, className = "" }: Omit<AnimatedProps, 'delay' | 'duration' | 'once'>) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
