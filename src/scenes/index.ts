import type { SceneDefinition } from '../story/types'
import { aboutScene } from './AboutScene'
import { contactScene } from './ContactScene'
import { experienceScene } from './ExperienceScene'
import { introScene } from './IntroScene'
import { nowScene } from './NowScene'
import { skillsScene } from './SkillsScene'
import { statementScene } from './StatementScene'
import { workScene } from './WorkScene'

/** Story order. Reorder, add or remove scenes here; the scroll timeline adapts. */
export const scenes: SceneDefinition[] = [
  introScene,
  statementScene,
  aboutScene,
  workScene,
  skillsScene,
  experienceScene,
  nowScene,
  contactScene,
]
