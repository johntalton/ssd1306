# SSD1306

OLED Display driver over [I2CBus](https://github.com/johntalton/and-other-delights) abstraction.

[![npm Version](https://img.shields.io/npm/v/@johntalton/ssd1306.svg)](https://www.npmjs.com/package/@johntalton/ssd1306)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/ssd1306)
[![CI](https://github.com/johntalton/ssd1306/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/ssd1306/actions/workflows/CI.yml)


# Example

```javascript
import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { SSD1306, ADDRESS_MODE } from '@johntalton/ssd1306'

const bus = /* I2CBus of your choosing */
const aBus = new I2CAddressedBus(bus, 0x3C)
const device = new SSD1306(aBus)

await device.setAddressMode(ADDRESS_MODE.HORIZONTAL)
await device.setChargePump(true)
await device.setDisplay(true)
await device.setContrastControl(64) // 0 - 255
```
