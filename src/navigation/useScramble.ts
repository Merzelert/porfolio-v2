import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './motion'

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz'

/**
 * Writes `text` into the returned element with a scramble effect:
 * random letters that settle left to right. Writes to the DOM directly (no re-renders).
 */
export function useScramble<T extends HTMLElement>(text: string, duration = 520) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (prefersReducedMotion()) {
      element.textContent = text
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const settled = Math.floor(progress * text.length)
      let output = text.slice(0, settled)
      for (let i = settled; i < text.length; i++) {
        output += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      element.textContent = output
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, duration])

  return ref
}
