import { useRef, useState, type CSSProperties, type MouseEvent, type RefObject } from 'react'
import { gsap, useGSAP } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { centerOf, prefersReducedMotion, type Point } from './motion'

/** Matches the flip transition in index.css (4 steps). */
const FLIP_MS = 200

export type OverlayState = 'open' | 'closing' | 'closed'

interface IndexOverlayProps {
  scenes: SceneDefinition[]
  activeId: string
  state: OverlayState
  /** Element the reveal circle grows from (the index pill). */
  originRef: RefObject<HTMLElement | null>
  onSelect: (id: string, origin: Point) => void
}

/** Deterministic tilt per card, alternating sides. */
const tilt = (i: number) => `${(i % 2 ? -1 : 1) * (0.8 + ((i * 7) % 5) * 0.4)}deg`

export function IndexOverlay({ scenes, activeId, state, originRef, onSelect }: IndexOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [flippedId, setFlippedId] = useState<string | null>(null)
  const [lastState, setLastState] = useState(state)

  // Reset the flipped card every time the overlay opens again.
  if (state !== lastState) {
    setLastState(state)
    if (state === 'open') setFlippedId(null)
  }

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const origin = originRef.current ? centerOf(originRef.current) : { x: window.innerWidth, y: 0 }
      const at = `${origin.x}px ${origin.y}px`
      const reduced = prefersReducedMotion()
      gsap.killTweensOf(root)

      if (state === 'open') {
        document.documentElement.style.overflow = 'hidden'
        gsap.set(root, { visibility: 'visible' })
        if (!reduced) {
          gsap.fromTo(
            root,
            { clipPath: `circle(0px at ${at})` },
            { clipPath: `circle(150vmax at ${at})`, duration: 0.75, ease: 'power3.inOut' },
          )
          gsap.fromTo(
            root.querySelectorAll('.card'),
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.045, delay: 0.2 },
          )
        }
        root.querySelector<HTMLButtonElement>('.card[aria-current]')?.focus({ preventScroll: true })
        return
      }

      document.documentElement.style.overflow = ''

      if (state === 'closing' && !reduced) {
        gsap.to(root, {
          clipPath: `circle(0px at ${at})`,
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(root, { visibility: 'hidden' })
          },
        })
      } else {
        gsap.set(root, { visibility: 'hidden', clipPath: `circle(0px at ${at})` })
      }
    },
    { dependencies: [state], scope: rootRef },
  )

  const select = (id: string, event: MouseEvent<HTMLButtonElement>) => {
    if (flippedId) return
    const origin = centerOf(event.currentTarget)
    if (prefersReducedMotion()) {
      onSelect(id, origin)
      return
    }
    setFlippedId(id)
    window.setTimeout(() => onSelect(id, origin), FLIP_MS)
  }

  return (
    <div
      ref={rootRef}
      id="index-menu"
      className="index-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Index"
      inert={state !== 'open'}
      data-lenis-prevent
    >
      <div className="index-overlay__track">
        {scenes.map((scene, i) => (
          <button
            key={scene.id}
            className="card"
            data-flip={flippedId === scene.id}
            aria-current={scene.id === activeId ? 'step' : undefined}
            style={{ '--a': tilt(i), '--room': scene.color } as CSSProperties}
            onClick={(event) => select(scene.id, event)}
          >
            <span className="card__in">
              <span className="card__face">
                <span className="card__pic">
                  <span className="card__pic-label">{scene.id}</span>
                </span>
                <span className="card__n">{i + 1}</span>
                <span className="card__t">{scene.title}</span>
              </span>
              <span className="card__back" />
              {scene.id === activeId && <i className="card__dot" aria-hidden="true" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
