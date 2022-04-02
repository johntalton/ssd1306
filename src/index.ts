import { I2CAddressedBus, I2CBufferSource } from '@johntalton/and-other-delights'


// async function writeCommand(addressedDev, bufferSource) {
// 	const driver = addressedDev.i2cbus.driver
// 	const dev = addressedDev.dev

// 	const startOk = await driver.start(dev, false)
// 	console.log({ startOk })
// 	const writeOk = await driver.write(bufferSource.byteLength, bufferSource)
// 	console.log({ writeOk })

// 	const ackedOk = driver.read(1)
// 	console.log({ ackedOk })

// 	await driver.stop()

// 	// const flushOk = await driver.readACKAll(bufferSource.byteLength)
// 	// console.log({ flushOk })
// }

async function writeCommand(addressedDev: I2CAddressedBus, bufferSource: I2CBufferSource) {
  await addressedDev.i2cWrite(Uint8Array.from([ 0x00 ]))

	await addressedDev.i2cWrite(bufferSource)
}

async function init(addressedDev: I2CAddressedBus) {
	// console.log('init')
	await writeCommand(addressedDev, Uint8Array.from([ 0xAE, 0x00 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0x20, 0x01, 0x00 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0x81, 0x01, 0xcf ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xA1, 0x00 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xA6, 0x00 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xc8, 0x00 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xA8, 0x01, 0x3f ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xd5, 0x01, 0x80 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xd9, 0x01, 0xf1 ]))
  await writeCommand(addressedDev, Uint8Array.from([ 0xda, 0x01, 0x12 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xdb, 0x01, 0x40 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0x8d, 0x01, 0x14 ]))
	await writeCommand(addressedDev, Uint8Array.from([ 0xAF, 0x00 ]))

	// console.log('init done')

	//await addressedDev.i2cbus.driver.stop()
}


// async function setDisplayOn(addressedDev: I2CAddressedBus) {
// 	//return writeCommand(addressedDev, Uint8Array.from([ 0xAF ]))
// }

// async function setDisplayOff(addressedDev: I2CAddressedBus): Promise<void> {
// 	//return writeCommand(addressedDev, Uint8Array.from([ 0xAE ]))
// }



export class SSD1306 {
	#addresssedBus: I2CAddressedBus


	static from(addresssedBus: I2CAddressedBus) {
		return new SSD1306(addresssedBus)
	}

	constructor(addresssedBus: I2CAddressedBus) {
		this.#addresssedBus = addresssedBus
	}

	get fundamental() {
		return {
			setContrastControl: () => {},
			entireDisplayOn: () => {},
			entireDisplayOnResume: () => {},
			setNormalDisplay: () => {},
			setInverseDisplay: () => {},
			// setDisplayOn: () => setDisplayOn(this.#addresssedBus),
			// setDisplayOff: () => setDisplayOff(this.#addresssedBus),

			init: () => init(this.#addresssedBus)
		}
	}
}

