import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Timeline for a scene: linear by default, because scroll already sets the pace. */
export const sceneTimeline = () => gsap.timeline({ defaults: { ease: 'none' } })

export { gsap, ScrollTrigger, useGSAP }
