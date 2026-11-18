import { site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'

function ExperienceScene() {
  return (
    <div className="experience">
      <h2 className="experience__title">
        the <em>receipt</em>
      </h2>

      <div className="receipt">
        <div className="receipt__head">
          <strong>{site.name}</strong>
          <span>career, itemized</span>
          <span>{site.updated}</span>
        </div>
        <ul className="receipt__rows">
          {site.experience.map((item) => (
            <li className="receipt__row" key={`${item.period}-${item.role}-${item.company}`}>
              <span className="receipt__period">{item.period}</span>
              <span className="receipt__role">
                {item.role}
                <small>{item.company}</small>
              </span>
              {item.highlights && (
                <ul className="receipt__items">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="receipt__total">
          <span>TOTAL</span>
          <span>{site.experienceTotal}</span>
        </div>
        <div className="receipt__barcode" aria-hidden="true" />
      </div>
    </div>
  )
}

export const experienceScene: SceneDefinition = {
  id: 'experience',
  title: 'experience',
  length: 2,
  anchor: 1.5,
  theme: 'dark',
  color: 'var(--g-brand)',
  Component: ExperienceScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    return sceneTimeline()
      .fromTo(q('.receipt'), { yPercent: 120 }, { yPercent: 0, duration: 1.1, ease: 'power1.out' }, 0)
      .fromTo(q('.receipt__row'), { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.15, duration: 0.1, ease: 'steps(1)' }, 0.4)
      .fromTo(q('.experience__title'), { xPercent: -30, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.5 }, 0)
  },
}
