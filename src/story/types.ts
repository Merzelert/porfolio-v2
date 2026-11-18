import type { ComponentType } from 'react'

export interface GoToOptions {
  /** Jump without smooth scrolling (used behind a covering transition). */
  immediate?: boolean
}

/** Tone of the scene background; the HUD switches its colors to stay readable. */
export type SceneTheme = 'light' | 'dark'

export interface SceneDefinition {
  id: string
  /** Shown in the HUD and in the index menu. */
  title: string
  /** Scroll length of the scene, in viewport heights. */
  length: number
  /**
   * Where navigation lands inside the scene, in viewport heights from its start
   * (pick a moment where the composition is complete). Defaults to right after the wipe.
   */
  anchor?: number
  theme: SceneTheme
  /** Background of the scene (CSS color or gradient); used by the index cards and the wash transition. */
  color: string
  Component: ComponentType
  /**
   * Builds the scroll-scrubbed timeline for the scene.
   * One timeline second equals one viewport height of scroll.
   */
  animate: (root: HTMLElement) => gsap.core.Timeline
}
