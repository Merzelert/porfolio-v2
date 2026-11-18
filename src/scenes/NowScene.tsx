import { assets, site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { Placeholder } from '../ui/Placeholder'

function NowScene() {
  return (
    <div className="now">
      <div className="now__glow loop-breathe" />
      <div className="now__cord" />
      <Placeholder asset={assets.nowBulb} className="now__bulb" />

      <figure className="polaroid">
        <Placeholder asset={assets.nowPhoto} className="polaroid__photo" />
        <figcaption>{site.now.caption}</figcaption>
      </figure>

      <div className="now__copy">
        <span className="now__kicker">## {site.now.kicker}</span>
        <p>{site.now.text}</p>
      </div>
    </div>
  )
}

export const nowScene: SceneDefinition = {
  id: 'now',
  title: 'right now',
  length: 1.8,
  anchor: 1.5,
  theme: 'dark',
  color: 'var(--c-night)',
  Component: NowScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    return sceneTimeline()
      .fromTo(q('.polaroid'), { yPercent: -160, rotate: -28 }, { yPercent: 0, rotate: 5, duration: 0.9, ease: 'back.out(1.4)' }, 0.1)
      .fromTo(q('.now__copy'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.7)
      .fromTo(q('.now__bulb, .now__cord'), { yPercent: -40 }, { yPercent: 0, duration: 0.6, ease: 'power2.out' }, 0)
  },
}
