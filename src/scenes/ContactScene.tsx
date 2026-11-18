import { assets, site } from '../content/site'
import { gsap, sceneTimeline } from '../story/gsap'
import type { SceneDefinition } from '../story/types'
import { Caret } from '../ui/Decor'
import { Placeholder } from '../ui/Placeholder'

function ContactScene() {
  return (
    <div className="contact">
      <div className="notepad">
        <div className="notepad__rings" aria-hidden="true" />
        <p className="notepad__kicker">## next</p>
        <h2 className="notepad__title">
          say <em>hi</em>.
        </h2>
        <a className="notepad__email" href={`mailto:${site.email}`}>
          {site.email}
          <Caret />
        </a>
        <ul className="notepad__links">
          {site.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Placeholder asset={assets.contactPencil} className="contact__pencil loop-drift" />

      <div className="contact__footer">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>built with vite · gsap · lenis</span>
      </div>
    </div>
  )
}

export const contactScene: SceneDefinition = {
  id: 'contact',
  title: 'contact',
  length: 1.4,
  anchor: 1.2,
  theme: 'light',
  color: 'var(--c-lavender)',
  Component: ContactScene,
  animate: (root) => {
    const q = gsap.utils.selector(root)
    return sceneTimeline()
      .fromTo(q('.notepad'), { yPercent: 30, rotate: -9 }, { yPercent: 0, rotate: -2, duration: 0.7, ease: 'power2.out' }, 0)
      .fromTo(q('.contact__pencil'), { xPercent: 160, rotate: 40 }, { xPercent: 0, rotate: 18, duration: 0.7, ease: 'power2.out' }, 0.15)
  },
}
