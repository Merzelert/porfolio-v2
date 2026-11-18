import { assets, site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { ScrollHint, Steam } from '../ui/Decor'
import { Placeholder } from '../ui/Placeholder'

function IntroScene() {
  return (
    <div className="intro">
      <div className="intro__wall" />
      <div className="intro__floor" />

      <h1 className="intro__wordmark">
        <span className="intro__main">{site.wordmark.main}</span>
        <span className="intro__dot">.</span>
        <span className="intro__suffix">{site.wordmark.suffix}</span>
      </h1>

      <Placeholder asset={assets.introObject} className="intro__object" />
      <div className="intro__figure">
        <Steam className="intro__steam" />
        <Placeholder asset={assets.introFigure} className="loop-breathe" />
      </div>
      <Placeholder asset={assets.introLamp} className="intro__lamp" />

      <ul className="intro__terminal">
        {site.introLines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <ScrollHint className="intro__hint" />

      <div className="intro__meta">
        <span>{site.name}</span>
        <span>{site.updated}</span>
      </div>
    </div>
  )
}

export const introScene: SceneDefinition = {
  id: 'intro',
  title: 'intro',
  length: 1.4,
  theme: 'dark',
  color: 'var(--c-indigo)',
  Component: IntroScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    return sceneTimeline()
      .to(q('.intro__wordmark'), { yPercent: -140, scale: 0.8, duration: 1 }, 0)
      .to(q('.intro__object'), { xPercent: -70, duration: 1 }, 0)
      .to(q('.intro__lamp'), { xPercent: 70, duration: 1 }, 0)
      .to(q('.intro__figure'), { scale: 1.3, duration: 1 }, 0)
      .to(q('.intro__terminal, .intro__meta, .intro__hint'), { autoAlpha: 0, duration: 0.35 }, 0)
  },
}
