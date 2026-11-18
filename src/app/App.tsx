import { useCallback } from 'react'
import type { Point } from '../navigation/motion'
import { useWashTransition } from '../navigation/useWashTransition'
import { scenes } from '../scenes'
import { useScrollStory } from '../story/useScrollStory'
import { useSmoothScroll } from '../story/useSmoothScroll'
import { Grain } from '../ui/Decor'
import { Hud } from '../ui/Hud'

export function App() {
  const lenisRef = useSmoothScroll()
  const { stageRef, spacerRef, progressRef, activeId, goTo } = useScrollStory(scenes, lenisRef)
  const { washRef, run } = useWashTransition(goTo)

  const navigate = useCallback(
    (id: string, origin: Point, onCovered?: () => void) => {
      const scene = scenes.find((candidate) => candidate.id === id)
      if (scene) run(id, scene.color, origin, onCovered)
    },
    [run],
  )

  return (
    <>
      <Hud scenes={scenes} activeId={activeId} onNavigate={navigate} />

      <main ref={stageRef} className="stage">
        {scenes.map(({ id, title, theme, Component }, i) => (
          <section
            key={id}
            data-scene={id}
            data-theme={theme}
            aria-label={title}
            className={`scene${id === activeId ? ' is-on' : ''}`}
            style={{ zIndex: i }}
          >
            <Component />
          </section>
        ))}
      </main>

      <div ref={spacerRef} className="spacer" aria-hidden="true" />
      <div ref={progressRef} className="progress" aria-hidden="true" />
      <div ref={washRef} className="wash" aria-hidden="true" />
      <Grain />
    </>
  )
}
