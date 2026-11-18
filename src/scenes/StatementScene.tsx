import { site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'

/** Splits copy into words; words wrapped in *asterisks* get emphasis. */
const words = site.statement.split(' ').map((raw) => {
  const emphasized = /^\*.+\*[.,!?]?$/.test(raw)
  return { text: emphasized ? raw.replace(/\*/g, '') : raw, emphasized }
})

function StatementScene() {
  return (
    <div className="statement">
      <p className="statement__text">
        {words.map((word, i) => (
          <span key={i}>
            <span className={`word${word.emphasized ? ' word--em' : ''}`}>{word.text}</span>{' '}
          </span>
        ))}
      </p>
      <span className="statement__kicker">// {site.statementKicker}</span>
    </div>
  )
}

export const statementScene: SceneDefinition = {
  id: 'statement',
  title: 'the short version',
  length: 1.6,
  anchor: 1.45,
  theme: 'light',
  color: 'var(--c-mist)',
  Component: StatementScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    return sceneTimeline()
      .fromTo(q('.word'), { opacity: 0.1, yPercent: 25 }, { opacity: 1, yPercent: 0, stagger: 0.08, duration: 0.3 }, 0)
      .fromTo(q('.statement__kicker'), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.2 }, '>-0.1')
  },
}
