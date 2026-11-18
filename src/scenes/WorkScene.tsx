import type { CSSProperties } from 'react'
import { site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { Placeholder } from '../ui/Placeholder'

/** Deterministic per-seat variation so each figure fidgets at its own rhythm. */
const fidget = (i: number) =>
  ({
    '--r': `${(i % 2 ? 1 : -1) * (1.5 + (i % 3))}deg`,
    '--y': `${2 + (i % 3)}px`,
    '--d': `${1.4 + (i % 4) * 0.35}s`,
    '--delay': `${-i * 0.3}s`,
  }) as CSSProperties

const tilt = (i: number) => ({ rotate: `${(i % 2 ? 1 : -1) * (0.6 + (i % 3) * 0.5)}deg` })

function WorkScene() {
  return (
    <div className="work">
      <h2 className="work__title">
        selected <em>work</em>
      </h2>

      <div className="work__track">
        <div className="work__cloth" />
        {site.projects.map((project, i) => (
          <article className="seat" key={project.title}>
            <Placeholder asset={project.figure} className="seat__figure loop-fidget" style={fidget(i)} />
            <div className="seat__card" style={tilt(i)}>
              <span className="seat__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.title} ↗
                  </a>
                ) : project.title}</h3>
              <p>{project.blurb}</p>
              <span className="seat__meta">
                {project.year} · {project.stack.join(' / ')}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="work__floor" />
    </div>
  )
}

export const workScene: SceneDefinition = {
  id: 'work',
  title: 'selected work',
  length: 4,
  theme: 'light',
  color: 'var(--c-periwinkle)',
  Component: WorkScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    const track = q('.work__track')[0] as HTMLElement
    const distance = () => Math.max(0, track.scrollWidth - root.clientWidth)

    return sceneTimeline()
      .fromTo(track, { x: 0 }, { x: () => -distance(), duration: 3.6 }, 0.2)
      .to(q('.work__title'), { xPercent: -25, autoAlpha: 0.12, duration: 1.2 }, 0.2)
  },
}
