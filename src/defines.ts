import {
  HorizontalScrollDirection,
  MemoryAddressingMode,
  ScrollInterval
} from './types.js'

export const HORIZONTAL_SCROLL_DIRECTION_RIGHT: HorizontalScrollDirection = 0
export const HORIZONTAL_SCROLL_DIRECTION_LEFT: HorizontalScrollDirection = 1

export const ADDRESS_MODE: Record<string, MemoryAddressingMode> = {
  HORIZONTAL: 0b00,
  VERTICAL: 0b01,
  PAGE: 0b10,
  INVALID: 0b11
}

export const SCROLL_FREQUENCY: Record<string, ScrollInterval> = {
  FRAMES_2: 0b111,
  FRAMES_3: 0b100,
  FRAMES_4: 0b101,
  FRAMES_5: 0b000,
  FRAMES_25: 0b110,
  FRAMES_64: 0b001,
  FRAMES_128: 0b010,
  FRAMES_256: 0b011
}
