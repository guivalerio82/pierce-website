import {
  Flame as MotionIcon,
  Clock as ClockIcon,
  Compass as CompassIcon,
  Brain as BrainCircuitIcon,
} from "lucide-react"

export const Icons = {
  motivation: MotionIcon,
  procrastination: ClockIcon,
  direction: CompassIcon,
  anxiety: BrainCircuitIcon,
} as const

export type IconKeys = keyof typeof Icons 