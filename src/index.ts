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
  // await addressedDev.i2cWrite(Uint8Array.from([ 0x00 ]))
	return await addressedDev.i2cWrite(bufferSource)
}

async function init(addressedDev: I2CAddressedBus) {
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xAE ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xAF ]))
	// const result = await addressedDev.i2cRead(1)
	// const r = new Uint8Array(result)
	// if(r) {}
	// return
	// console.log('init', result)

	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xAE ])) // display off
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0x20, 0x01, 0x00 ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA1, 0x00 ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA6, 0x00 ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xc8, 0x00 ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA8, 0x01, 0x3f ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xd9, 0x01, 0xf1 ]))
  // await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xda, 0x01, 0x12 ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xdb, 0x01, 0x40 ]))

	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xd5, 0x80 ])) // clock divider
	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA8, 64 - 1 ])) // multiplexer

	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xDA, 0x32 ])) // coms pin
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xD3, 0x00 ])) // offset
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0x40, 0x00 ])) // start line
	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0x20, 0x00 ])) // mode

	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA1 ])) // left to right
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0x22, 0, 7 ]))
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xB7 ]))



	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0x8d, 0x14 ])) // enable charge pump

	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0x81, 0x01 ])) // contrast
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA4 ]))  //display ram
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA5 ]))  //display fullon
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA6 ])) // display non invert
	// await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xA7 ])) // display invert
	await writeCommand(addressedDev, Uint8Array.from([ 0x00, 0xAF ])) // display on

	// console.log('init done')

	//await addressedDev.i2cbus.driver.stop()

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))

	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))
	await addressedDev.i2cWrite(Uint8Array.from([ 0x40, ...(new Array(32).fill(0x0f))  ]))


	for(let i = 0; i < (128/16 * 64/8) ; i +=1) {
		const n = () => Math.trunc(Math.random() * 255)
		await addressedDev.i2cWrite(Uint8Array.from([ 0x40, n(), n(), n(), n(), n(), n(), n(), n(), n(), n(), n(), n(), n(), n(), n(), n()  ]))
	}

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

			init: () => init(this.#addresssedBus),
			setPixel: (x,y,on) => {}
		}
	}
}

