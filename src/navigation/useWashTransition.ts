import { useCallback, useRef } from 'react'
import { gsap } from '../story/gsap'
import type { GoToOptions } from '../story/types'
import { coverRadius, nextFrames, prefersReducedMotion, type Point } from './motion'

/**
 * Scene-to-scene jump hidden behind a color wash:
 * 1. a circle of the target color grows from `origin` until it covers the screen,
 * 2. `onCovered` runs and the scroll jumps instantly to the target scene,
 * 3. a hole opens in the middle of the wash and reveals the scene.
 */
export function useWashTransition(goTo: (id: string, options?: GoToOptions) => void) {
  const washRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)

  const run = useCallback(
    async (id: string, color: string, origin: Point, onCovered?: () => void) => {
      const wash = washRef.current
      if (!wash || busyRef.current) return

      if (prefersReducedMotion()) {
        onCovered?.()
        goTo(id, { immediate: true })
        return
      }

      busyRef.current = true
      const at = `${origin.x}px ${origin.y}px`

      gsap.set(wash, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        background: color,
        '--hole': '0px',
        clipPath: `circle(0px at ${at})`,
      })
      await gsap.to(wash, { clipPath: `circle(${coverRadius(origin)}px at ${at})`, duration: 0.55, ease: 'power3.in' })

      onCovered?.()
      goTo(id, { immediate: true })
      await nextFrames(2)

      const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      await gsap.to(wash, { '--hole': `${coverRadius(center)}px`, duration: 0.9, ease: 'power2.inOut' })

      gsap.set(wash, { autoAlpha: 0, pointerEvents: 'none', clipPath: 'none', '--hole': '0px' })
      busyRef.current = false
    },
    [goTo],
  )

  return { washRef, run }
}
