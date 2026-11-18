import { assets, site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { Caret } from '../ui/Decor'
import { Placeholder } from '../ui/Placeholder'

const lineKind = (line: string) => {
  if (line.startsWith('#')) return 'is-heading'
  if (line.startsWith('>')) return 'is-quote'
  if (line.startsWith('-')) return 'is-item'
  return ''
}

const lineNumber = (n: number) => String(n).padStart(2, '0')

function AboutScene() {
  return (
    <div className="about">
      <div className="file">
        <div className="file__bar">
          <i />
          <i />
          <i />
          <span>ABOUT.md</span>
        </div>
        <div className="file__body">
          {site.about.map((line, i) => (
            <p key={line} className={`file__line ${lineKind(line)}`}>
              <span className="file__num">{lineNumber(i + 1)}</span>
              <span className="file__text">
                {line.startsWith('- ') ? (
                  <>
                    <span className="file__mark">-</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )}
              </span>
            </p>
          ))}
          <p className="file__line">
            <span className="file__num">{lineNumber(site.about.length + 1)}</span>
            <Caret />
          </p>
        </div>
      </div>
      <Placeholder asset={assets.aboutPortrait} className="about__portrait loop-breathe" />
    </div>
  )
}

export const aboutScene: SceneDefinition = {
  id: 'about',
  title: 'about',
  length: 1.8,
  anchor: 1.55,
  theme: 'dark',
  color: 'var(--c-slate)',
  Component: AboutScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    return sceneTimeline()
      .fromTo(q('.file'), { y: 60, rotate: -2 }, { y: 0, rotate: 0, duration: 0.5, ease: 'power2.out' }, 0)
      .fromTo(
        q('.file__text'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.16, duration: 0.25, ease: 'steps(14)' },
        0.15,
      )
      .fromTo(q('.about__portrait'), { xPercent: 40, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.6 }, 0.2)
  },
}
