import { assets, site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { Placeholder } from '../ui/Placeholder'

function SkillsScene() {
  return (
    <div className="skills">
      <h2 className="skills__title">
        measured in <em>shipped</em> things
      </h2>

      <div className="ruler">
        <div className="ruler__track">
          {site.skills.map((skill, i) => (
            <div className="ruler__mark" key={skill}>
              <span className="ruler__num">{i + 1}</span>
              <span className="ruler__label">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <Placeholder asset={assets.skillsObject} className="skills__object loop-drift" />
    </div>
  )
}

export const skillsScene: SceneDefinition = {
  id: 'skills',
  title: 'toolbox',
  length: 2.6,
  anchor: 0.8,
  theme: 'dark',
  color: 'var(--c-deep)',
  Component: SkillsScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    const track = q('.ruler__track')[0] as HTMLElement
    const distance = () => Math.max(0, track.scrollWidth - root.clientWidth * 0.6)

    return sceneTimeline()
      .fromTo(track, { x: () => root.clientWidth * 0.4 }, { x: () => -distance(), duration: 1.9 }, 0)
      .fromTo(q('.skills__title'), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4 }, 0)
      .fromTo(q('.skills__object'), { rotate: -18 }, { rotate: 12, duration: 2 }, 0)
  },
}
