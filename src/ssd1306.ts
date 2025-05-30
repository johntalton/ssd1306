import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { Common } from './common.js'
import {
	Page, Column,
	MemoryAddressingMode,
	HorizontalScrollDirection,
	ScrollInterval,
	Row,
	MuxRatio,
	PreChargePeriod,
	OscillatorFrequency,
	ClockDivider
} from './types.js'


export class SSD1306 {
	#addresssedBus: I2CAddressedBus

	static from(addresssedBus: I2CAddressedBus) {
		return new SSD1306(addresssedBus)
	}

	constructor(addresssedBus: I2CAddressedBus) {
		this.#addresssedBus = addresssedBus
	}

	// Fundamental
	async setContrastControl(contrast: number) { return Common.setContrastControl(this.#addresssedBus, contrast) }

	async setDisplayMode(allOn: boolean = false) { return Common.setDisplayMode(this.#addresssedBus, allOn) }

	async setDisplay(on: boolean = true) { return Common.setDisplay(this.#addresssedBus, on) }

	async setDisplayInvert(invert: boolean = false) { return Common.setDisplayInvert(this.#addresssedBus, invert) }


	// Scrolling
	async setContinuousHorizontalScrolling(direction: HorizontalScrollDirection, startPage: Page, endPage: Page, interval: ScrollInterval) {
		return Common.setContinuousHorizontalScrolling(this.#addresssedBus, direction, startPage, endPage, interval)
	}

	async setVerticalAndHorizontalScrolling(direction: HorizontalScrollDirection, startPage: Page, endPage: Page, interval: ScrollInterval, verticalOffset: Row) {
		return Common.setVerticalAndHorizontalScrolling(this.#addresssedBus, direction, startPage, endPage, interval, verticalOffset)
	}

	async setScrolling(enable: boolean) { return Common.setScrolling(this.#addresssedBus, enable) }

	async setVerticalScrollArea(top: Row, rows: Row) { return Common.setVerticalScrollArea(this.#addresssedBus, top, rows) }

	// Addressing
	async setAddressMode(mode: MemoryAddressingMode) { return Common.setAddressMode(this.#addresssedBus, mode) }

	async setColumnAddress(start: Column, end: Column) { return Common.setColumnAddress(this.#addresssedBus, start, end) }

	async setPageAddress(start: Page, end: Page) { return Common.setPageAddress(this.#addresssedBus, start, end) }

	async setPageModeStartAddress(start: Page) { return Common.setPageModeStartAddress(this.#addresssedBus, start) }

	// Hardware
	async setDisplayStartLine(start: Row) { return Common.setDisplayStartLine(this.#addresssedBus, start) }

	async setSegmentMap(remap: boolean = false) { return Common.setSegmentMap(this.#addresssedBus,remap) }

	async setMultiplexRatio(ratio: MuxRatio) { return Common.setMultiplexRatio(this.#addresssedBus, ratio) }

	async setComOutputScanDirection(remap: boolean) { return Common.setComOutputScanDirection(this.#addresssedBus, remap) }

	async setDisplayOffset(offset: Row) { return Common.setDisplayOffset(this.#addresssedBus, offset) }

	async setCOMPinsHardware(altCom: boolean, leftRightRemap: boolean) { return Common.setCOMPinsHardware(this.#addresssedBus, altCom, leftRightRemap)}

	// Timing
	async setDisplayClock(clockDivider: ClockDivider, oscillatorFrequency: OscillatorFrequency) { return Common.setDisplayClock(this.#addresssedBus, clockDivider, oscillatorFrequency) }
	async setPreChargePeriod(phase1Period: PreChargePeriod, phase2Period: PreChargePeriod) { return Common.setPreChargePeriod(this.#addresssedBus, phase1Period, phase2Period) }
	async setVCOMHDeselectLevel(level: number) { return Common.setVCOMHDeselectLevel(this.#addresssedBus, level) }


	// No Op
	async nop() { return Common.nop(this.#addresssedBus) }

	// Charge Pump
	setChargePump(enable: boolean = true) { return Common.setChargePump(this.#addresssedBus, enable) }

	//
	async status() { return Common.status(this.#addresssedBus) }

	//
	async writeData(ramData: Array<number>) { return Common.writeData(this.#addresssedBus, ramData) }

	// async readData() {}

}

