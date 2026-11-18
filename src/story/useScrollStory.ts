import { useCallback, useRef, useState, type RefObject } from 'react'
import type Lenis from 'lenis'
import { gsap, ScrollTrigger, useGSAP } from './gsap'
import type { GoToOptions, SceneDefinition } from './types'

/** Length of the wipe between two scenes, in viewport heights. */
const TRANSITION = 0.6

/**
 * Turns the document scroll into one master timeline.
 * Scenes are stacked full-screen layers; each one wipes in over the previous one,
 * then plays its own scrubbed timeline. A tall spacer provides the scroll distance.
 */
export function useScrollStory(scenes: SceneDefinition[], lenisRef: RefObject<Lenis | null>) {
  const stageRef = useRef<HTMLElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [activeId, setActiveId] = useState(scenes[0].id)

  useGSAP(
    () => {
      const stage = stageRef.current
      const spacer = spacerRef.current
      if (!stage || !spacer) return

      const roots = scenes.map((scene) => {
        const root = stage.querySelector<HTMLElement>(`[data-scene="${scene.id}"]`)
        if (!root) throw new Error(`Scene root not found: ${scene.id}`)
        return root
      })

      const total = scenes.reduce((sum, scene) => sum + scene.length, 0)
      spacer.style.height = `${(total + 1) * 100}vh`

      gsap.set(roots.slice(1), { autoAlpha: 0, clipPath: 'inset(100% 0% 0% 0%)' })

      let lastId = scenes[0].id
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: () => `+=${spacer.offsetHeight - window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current?.style.setProperty('--progress', self.progress.toFixed(4))
            const id = timeline.currentLabel()
            if (id && id !== lastId) {
              lastId = id
              setActiveId(id)
            }
          },
        },
      })

      let cursor = 0
      scenes.forEach((scene, index) => {
        const root = roots[index]
        timeline.addLabel(scene.id, cursor)

        if (index > 0) {
          const previous = roots[index - 1]
          timeline
            .set(root, { autoAlpha: 1 }, cursor)
            .fromTo(
              root,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: TRANSITION, ease: 'power2.inOut', immediateRender: false },
              cursor,
            )
            .to(previous, { yPercent: -8, duration: TRANSITION, ease: 'power2.inOut' }, cursor)
            .set(previous, { autoAlpha: 0 }, cursor + TRANSITION)
        }

        timeline.add(scene.animate(root), index > 0 ? cursor + TRANSITION * 0.5 : cursor)
        cursor += scene.length
      })

      // Pad so the last scene keeps its full length.
      timeline.set({}, {}, cursor)
      timelineRef.current = timeline

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: stageRef, dependencies: [scenes] },
  )

  const goTo = useCallback(
    (id: string, { immediate = false }: GoToOptions = {}) => {
      const timeline = timelineRef.current
      const trigger = timeline?.scrollTrigger
      if (!timeline || !trigger || !(id in timeline.labels)) return

      const index = scenes.findIndex((scene) => scene.id === id)
      const anchor = scenes[index].anchor ?? (index === 0 ? 0 : TRANSITION)
      const time = timeline.labels[id] + anchor
      const y = trigger.start + (trigger.end - trigger.start) * (time / timeline.duration())

      const lenis = lenisRef.current
      if (lenis) lenis.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 1.6, force: true })
      else window.scrollTo({ top: y, behavior: immediate ? 'instant' : 'smooth' })
      if (immediate) ScrollTrigger.update()
    },
    [scenes, lenisRef],
  )

  return { stageRef, spacerRef, progressRef, activeId, goTo }
}
