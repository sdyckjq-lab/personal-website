"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { useIsMobile } from "@/hooks/use-mobile"

export function ParticlesBackground() {
  const [init, setInit] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    // 移动端不加载粒子
    if (isMobile) return

    let isMounted = true

    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      // 防止组件卸载后setState导致内存泄漏
      if (isMounted) {
        setInit(true)
      }
    })

    return () => {
      isMounted = false
    }
  }, [isMobile])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // 粒子加载完成回调
  }

  // 移动端显示渐变背景
  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        }}
      />
    )
  }

  const options: ISourceOptions = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: ["#00d9ff", "#ff00aa", "#8b5cf6"],
      },
      links: {
        color: "#00d9ff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        value: 60,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }

  if (!init) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        }}
      />
    )
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="fixed inset-0 -z-10"
    />
  )
}
