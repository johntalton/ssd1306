import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { LOGO } from '../logo.js'

import {
	Page, Column,
	MemoryAddressingMode,
	HorizontalScrollDirection,
	MuxRatio,
	Row,
	ScrollInterval,
	PreChargePeriod,
	ClockDivider,
	OscillatorFrequency
} from './types.js'

import {
	HORIZONTAL_SCROLL_DIRECTION_RIGHT
} from './defines.js'

const MODE: Record<string, number> = {
	COMMAND: 0x00,
	DATA: 0x40
}

const COMMAND = {
	// Fundamental
	CONTRAST_CONTROL: 0x81,
	CONTENT_RESUME_TO_RAM: 0xA4,
	CONTENT_ALL_ON: 0xA5,
	DISPLAY_NORMAL: 0xA6,
	DISPLAY_INVERSE: 0xA7,
	DISPLAY_OFF: 0xAE,
	DISPLAY_ON: 0xAF,

	// Scrolling
	CONTINUOUS_HORIZONTAL_SCROLL_CONFIG_RIGHT: 0x26,
	CONTINUOUS_HORIZONTAL_SCROLL_CONFIG_LEFT: 0x27,
	CONTINUOUS_VERTICAL_AND_HORIZONTAL_SCROLL_CONFIG_RIGHT: 0x29,
	CONTINUOUS_VERTICAL_AND_HORIZONTAL_SCROLL_CONFIG_LEFT: 0x2A,
	DEACTIVATE_SCROLLING: 0x2E,
	ACTIVATE_SCROLLING: 0x2F,
	VERTICAL_SCROLL_AREA: 0xA3,

	// Addressing
	LOWER_COLUMN_START_ADDRESS_PAGE_MODE_0: 0x00,
	HIGHER_COLUMN_START_ADDRESS_PAGE_MODE_0: 0x10,
	MEMORY_ADDRESS_MODE: 0x20,
	COLUMN_ADDRESS: 0x21,
	PAGE_ADDRESS: 0x22,
	PAGE_START_ADDRESS_PAGE_MODE_0: 0xB0,

	// Hardware
	DISPLAY_LINE_START_0: 0x40,
	SEGMENT_MAP_NORMAL: 0xA0,
	SEGMENT_MAP_REMAP: 0xA1,
	MULTIPLEX_RATIO: 0xA8,
	COM_OUT_SCAN_DIRECTION_NORMAL: 0xC0,
	COM_OUT_SCAN_DIRECTION_REMAP: 0xC8,
	DISPLAY_OFFSET: 0xD3,
	COM_PINS_HARDWARE_CONFIG: 0xDA,

	// Timing
	DISPLAY_CLOCK_DIVIDER_OSCILLATOR_FREQ: 0xD5,
	PRE_CHARGE_PERIOD: 0xD9,
	V_COMH_DESELECT_LEVEL: 0xDB,

	//
	NOP: 0xE3,

	// Charge Pump
	CHARGE_PUMP: 0x8d
}

const DUMMY_00 = 0x00
const DUMMY_FF = 0xFF

const NIBBLE_SIZE = 4

const MASK_2_BIT = 0b0000_0011
const MASK_3_BIT = 0b0000_0111
const MASK_4_BIT = 0b0000_1111
const MASK_6_BIT = 0b0011_1111
const MASK_7_BIT = 0b0111_1111
const MASK_8_BIT = 0b1111_1111

export class Common {
	// fundamental
	static async setContrastControl(aBus: I2CAddressedBus, contrast: number) {
		const A = contrast & MASK_8_BIT

		if(A !== contrast) { throw new Error('invalid contrast') }

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.CONTRAST_CONTROL, A ]))
	}

	static async setDisplayMode(aBus: I2CAddressedBus, allOn: boolean) {
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, allOn ? COMMAND.CONTENT_ALL_ON : COMMAND.CONTENT_RESUME_TO_RAM ]))
	}

	static async setDisplay(aBus: I2CAddressedBus, on: boolean) {
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, on ? COMMAND.DISPLAY_ON : COMMAND.DISPLAY_OFF ]))
	}

	static async setDisplayInvert(aBus: I2CAddressedBus, invert: boolean) {
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, invert ? COMMAND.DISPLAY_INVERSE : COMMAND.DISPLAY_NORMAL ]))
	}

	// Scrolling
	static async setContinuousHorizontalScrolling(aBus: I2CAddressedBus, direction: HorizontalScrollDirection, startPage: Page, endPage: Page, interval: ScrollInterval) {
		if(startPage > endPage) { throw new Error('end must be larger or equal to start') }
		const B = startPage & MASK_3_BIT
		const C = interval & MASK_3_BIT
		const D = endPage & MASK_3_BIT

		if(B !== startPage) { throw new Error('invalid startPage') }
		if(C !== interval) { throw new Error('invalid interval') }
		if(D !== endPage) { throw new Error('invalid endPage') }

		const command = (direction === HORIZONTAL_SCROLL_DIRECTION_RIGHT) ? COMMAND.CONTINUOUS_HORIZONTAL_SCROLL_CONFIG_RIGHT : COMMAND.CONTINUOUS_HORIZONTAL_SCROLL_CONFIG_LEFT

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command, DUMMY_00, B, C, D, DUMMY_00, DUMMY_FF ]))
	}

	static async setVerticalAndHorizontalScrolling(aBus: I2CAddressedBus, direction: HorizontalScrollDirection, startPage: Page, endPage: Page, interval: ScrollInterval, verticalOffset: Row) {
		if(startPage > endPage) { throw new Error('end must be larger or equal to start') }
		const B = startPage & MASK_3_BIT
		const C = interval & MASK_3_BIT
		const D = endPage & MASK_3_BIT
		const E = verticalOffset & MASK_6_BIT

		if(B !== startPage) { throw new Error('invalid startPage') }
		if(C !== interval) { throw new Error('invalid interval') }
		if(D !== endPage) { throw new Error('invalid endPage') }
		if(E !== verticalOffset) { throw new Error('invalid verticalOffset') }

		const command = (direction === HORIZONTAL_SCROLL_DIRECTION_RIGHT)? COMMAND.CONTINUOUS_VERTICAL_AND_HORIZONTAL_SCROLL_CONFIG_RIGHT : COMMAND.CONTINUOUS_VERTICAL_AND_HORIZONTAL_SCROLL_CONFIG_LEFT

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command, DUMMY_00, B, C, D, E ]))
	}

	static async setScrolling(aBus: I2CAddressedBus, enable: boolean) {
		const command = enable ? COMMAND.ACTIVATE_SCROLLING : COMMAND.DEACTIVATE_SCROLLING
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command ]))
	}

	static async setVerticalScrollArea(aBus: I2CAddressedBus, top: Row, rows: Row) {
		const A = top & MASK_6_BIT
		const B = rows & MASK_7_BIT

		if(A !== top) { throw new Error('invalid top') }
		if(A !== rows) { throw new Error('invalid rows') }

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.VERTICAL_SCROLL_AREA, A, B ]))
	}


	// Addressing
	// static async setPageModeLowerColumnStartAddress(aBus: I2CAddressedBus, ) {

	// 	return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND,  ]))
	// }

	// static async setPageModeHigherColumnStartAddress(aBus: I2CAddressedBus, ) {

	// 	return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND,  ]))
	// }

	static async setAddressMode(aBus: I2CAddressedBus, mode: MemoryAddressingMode) {
		const A = mode & MASK_2_BIT

		if(A !== mode) { throw new Error('invalid mode') }

		return aBus.i2cWrite(Uint8Array.from([ MODE.COMMAND, COMMAND.MEMORY_ADDRESS_MODE, A ]))
	}

	static async setColumnAddress(aBus: I2CAddressedBus, start: Column, end: Column) {
		const A = start & MASK_7_BIT
		const B = end & MASK_7_BIT

		if(A !== start) { throw new Error('invalid start') }
		if(B !== end) { throw new Error('invalid end') }

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.COLUMN_ADDRESS, A, B ]))
	}

	static async setPageAddress(aBus: I2CAddressedBus, start: Page, end: Page) {
		const A = start & MASK_3_BIT
		const B = end & MASK_3_BIT

		if(A !== start) { throw new Error('invalid start') }
		if(B !== end) { throw new Error('invalid end') }

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.PAGE_ADDRESS, A, B ]))
	}

	static async setPageModeStartAddress(aBus: I2CAddressedBus, start: Page) {
		const X = start & MASK_3_BIT

		if(X !== start) { throw new Error('invalid start') }

		const command = COMMAND.PAGE_START_ADDRESS_PAGE_MODE_0 | X
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command ]))
	}


	// Hardware
	static async setDisplayStartLine(aBus: I2CAddressedBus, start) {
		const command = COMMAND.DISPLAY_LINE_START_0 | (start & MASK_6_BIT)
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command ]))
	}

	static async setSegmentMap(aBus: I2CAddressedBus, remap: boolean) {
		const command = remap ? COMMAND.SEGMENT_MAP_REMAP : COMMAND.SEGMENT_MAP_NORMAL

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command ]))
	}

	static async setMultiplexRatio(aBus: I2CAddressedBus, ratio: MuxRatio) {
		if(ratio <= 14) { throw new Error('invalid ratio (0 to 14)') }
		const A = ratio & MASK_6_BIT

		if(A !== ratio) { throw new Error('invalid ratio') }


		return aBus.i2cWrite(Uint8Array.from([ MODE.COMMAND, COMMAND.MULTIPLEX_RATIO, A ]))
	}

	static async setComOutputScanDirection(aBus: I2CAddressedBus, remap: boolean) {
		const command = remap ? COMMAND.COM_OUT_SCAN_DIRECTION_REMAP : COMMAND.COM_OUT_SCAN_DIRECTION_NORMAL
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, command ]))
	}

	static async setDisplayOffset(aBus: I2CAddressedBus, offset) {
		const A = offset & MASK_6_BIT
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.DISPLAY_OFFSET, A ]))
	}

	static async setCOMPinsHardware(aBus: I2CAddressedBus, altCom: boolean, leftRightRemap: boolean) {
		const BASE_A = 0b0000_0010
		const HIGH = 0b1
		const LOW = 0b0
		const ALT_OFFSET = 4
		const REMAP_OFFSET = 5
		const ALT_COM_SET = HIGH << ALT_OFFSET
		const REMAP_SET = HIGH << REMAP_OFFSET

		const alt = altCom ? ALT_COM_SET : LOW
		const remap = leftRightRemap ? REMAP_SET : LOW

		const A = BASE_A | alt | remap
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.COM_PINS_HARDWARE_CONFIG, A ]))
	}



	// Timing
	static async setDisplayClock(aBus: I2CAddressedBus, clockDivider: ClockDivider, oscillatorFrequency: OscillatorFrequency) {
		const upper4 = clockDivider & MASK_4_BIT
		const lower4 = oscillatorFrequency & MASK_4_BIT

		if(upper4 !== clockDivider) { throw new Error('invalid clockDivider') }
		if(lower4 !== oscillatorFrequency) { throw new Error('invalid oscillatorFrequency') }

		const A = (upper4 << NIBBLE_SIZE) | lower4
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.DISPLAY_CLOCK_DIVIDER_OSCILLATOR_FREQ, A ]))
	}

	static async setPreChargePeriod(aBus: I2CAddressedBus, phase1Period: PreChargePeriod, phase2Period: PreChargePeriod) {
		if(phase1Period === 0) { throw new Error('phase 1 period of zero is invalid') }
		if(phase2Period === 0) { throw new Error('phase 2 period of zero is invalid') }

		const upper4 = phase1Period & MASK_4_BIT
		const lower4 = phase2Period & MASK_4_BIT

		if(upper4 !== phase1Period) { throw new Error('invalid phase1Period') }
		if(lower4 !== phase2Period) { throw new Error('invalid phase2Period') }

		const A = (upper4 << NIBBLE_SIZE) | lower4
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.PRE_CHARGE_PERIOD, A ]))
	}

	static async setVCOMHDeselectLevel(aBus: I2CAddressedBus, level) {
		const A = (level & MASK_3_BIT) << NIBBLE_SIZE
		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.V_COMH_DESELECT_LEVEL, A ]))
	}


	// No Op
	static async nop(aBus: I2CAddressedBus) {
		return aBus.i2cWrite(Uint8Array.from([ MODE.COMMAND, COMMAND.NOP ]))
	}

	// Charge Pump
	static async setChargePump(aBus: I2CAddressedBus, enable: boolean) {
		const CHARGE_PUMP = {
			ENABLE: 0x14,
			DISABLE: 0x10
		}

		return aBus.i2cWrite(Uint8ClampedArray.from([ MODE.COMMAND, COMMAND.CHARGE_PUMP, enable ? CHARGE_PUMP.ENABLE : CHARGE_PUMP.DISABLE ]))
	}

	//
	static async writeData(aBus: I2CAddressedBus) {
		const step = 60

		for(let i = 0; i < LOGO.length; i += step) {
			const buffer = LOGO.slice(i, i + step)
			await aBus.i2cWrite(Uint8Array.from([ MODE.DATA, ...buffer ]))
		}
	}

	static async _writeData(aBus: I2CAddressedBus) {


		const pattern1 = [
			0b1000_0000,
			0b1100_0000,
			0b1110_0000,
			0b1111_1111,
			0b1110_0000,
			0b1100_0000,
			0b1000_0000,
			0b0000_0000
		]

		const pattern2 = [
			0b1000_0000,
			0b1100_0000,
			0b1110_0000,
			0b1111_0000,
			0b1110_0000,
			0b1100_0000,
			0b1000_0000,
			0b0000_0000
		]

		const pattern3 = [
			0b0000_1100,
			0b0000_1100,
			0b0000_1100,
			0b0000_1100,
			0b0000_1100,
			0b0000_1100,
			0b0000_1100,
			0b0000_1100
		]

		const buffer = [
			...pattern1,
			...pattern2,
			...pattern3,
			...pattern3
		]

		const pages = 8
		const segments = 128
		const times = (segments / buffer.length) * pages

		for(let i = 0; i <  times; i +=1) {
			await aBus.i2cWrite(Uint8Array.from([ MODE.DATA, ...buffer ]))
		}
	}


	// read
	static async status(aBus: I2CAddressedBus) {
		const DISPLAY_STATUS_BIT_MASK = 0b0100_0000
		const STATUS_LENGTH = 1

		const buffer = await aBus.i2cRead(STATUS_LENGTH)
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, 0, STATUS_LENGTH) :
			new Uint8Array(buffer, 0, STATUS_LENGTH)

		const [ s ] = u8

		const display = (s & DISPLAY_STATUS_BIT_MASK) === 0

		return {
			display
		}
	}

	async readData(aBus: I2CAddressedBus, length: number) {
		const buffer = await aBus.i2cRead(length)

		return ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, 0, length) :
			new Uint8Array(buffer, 0, length)
	}
}
