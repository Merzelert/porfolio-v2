import { useEffect, useRef, useState } from 'react'
import { assets, site } from '../content/site'
import { IndexOverlay, type OverlayState } from '../navigation/IndexOverlay'
import { centerOf, type Point } from '../navigation/motion'
import { useScramble } from '../navigation/useScramble'
import type { SceneDefinition } from '../story/types'
import { Steam } from './Decor'
import { Placeholder } from './Placeholder'

interface HudProps {
  scenes: SceneDefinition[]
  activeId: string
  onNavigate: (id: string, origin: Point, onCovered?: () => void) => void
}

export function Hud({ scenes, activeId, onNavigate }: HudProps) {
  const [overlay, setOverlay] = useState<OverlayState>('closed')
  const pillRef = useRef<HTMLButtonElement>(null)
  const open = overlay === 'open'
  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeId))
  const active = scenes[activeIndex]
  const sectionRef = useScramble<HTMLSpanElement>(active.title)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOverlay('closing')
      pillRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = () => setOverlay((state) => (state === 'open' ? 'closing' : 'open'))

  const selectFromIndex = (id: string, origin: Point) => onNavigate(id, origin, () => setOverlay('closed'))

  return (
    <>
      <header className="hud" data-theme={open ? 'dark' : active.theme}>
        <div className="hud__left">
          <button
            className="hud__logo"
            onClick={(event) => onNavigate(scenes[0].id, centerOf(event.currentTarget))}
            aria-label="Back to start"
          >
            <Steam className="hud__steam" />
            <Placeholder asset={assets.logo} className="hud__mug" />
          </button>
          <span className="hud__brand">
            {site.wordmark.main}.{site.wordmark.suffix}
            <i className="hud__dot" aria-hidden="true" />
          </span>
          <span className="hud__section" data-hidden={activeIndex === 0 || open}>
            <b aria-hidden="true">##</b> <span ref={sectionRef} aria-hidden="true" />
            <span className="sr-only" aria-live="polite">
              {active.title}
            </span>
          </span>
        </div>

        <nav className="hud__right" aria-label="Main">
          <button
            className="hud__link"
            data-hidden={open}
            onClick={(event) => onNavigate('contact', centerOf(event.currentTarget))}
          >
            contact
          </button>
          <button
            ref={pillRef}
            className="hud__pill"
            aria-expanded={open}
            aria-controls="index-menu"
            onClick={toggle}
          >
            {open ? 'close' : 'index'}
            <span className="hud__burger" data-open={open} aria-hidden="true" />
          </button>
        </nav>
      </header>

      <IndexOverlay
        scenes={scenes}
        activeId={activeId}
        state={overlay}
        originRef={pillRef}
        onSelect={selectFromIndex}
      />
    </>
  )
}
