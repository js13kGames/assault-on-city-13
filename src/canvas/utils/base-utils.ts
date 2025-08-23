import { eftRanges } from '../constants/default-data'
import type { All, City, Eft, Item, Npc, NpcItem } from '../types'

export const rand = (): number => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
export const rand100 = (): number => rand() * 100
export const randInt = (maxNum: number, minNum = 0): number =>
  Math.floor(rand() * (maxNum - minNum + 1) + minNum)
export const randBoolean = (): boolean => rand() > 0.5
export const numToUnitNum = (num: number): string => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1)}T`
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`
  }
  return num.toString()
}
/**
 * Helper function to adjust color luminance
 */
export const colorLuminance = (hex: string, lum: number): string => {
  hex = hex.replace(/^#/, '')
  let rgb = ''
  for (let i = 0; i < 3; i++) {
    let c = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
    c = Math.round(Math.min(Math.max(0, c * (1 + lum)), 255))
    rgb += c.toString(16).padStart(2, '0')
  }
  return `#${rgb}`
}

/**
 * Helper function to detect if a point is inside a rectangle
 */
export const isPointInRect = (
  x: number,
  y: number,
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number
): boolean => {
  return x >= rectX && x <= rectX + rectWidth && y >= rectY && y <= rectY + rectHeight
}

/**
 * Helper function to detect if a point is inside a circle
 */
export const isPointInCircle = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number
): boolean => {
  const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
  return distance <= radius
}

export const isInBounds = (
  x: number,
  y: number,
  bounds: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    x >= bounds.x && x <= bounds.x + bounds.width && y >= bounds.y && y <= bounds.y + bounds.height
  )
}

export const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const initCityNpcs = (city: City, allNpcs: Npc[]): Npc[] => {
  const ns: Npc[] = []
  city.nIds.forEach((id) => {
    const npc = allNpcs.find((npc) => npc.id === id)
    if (npc) {
      ns.push(npc)
    }
  })
  return ns
}

export const getMemberAddText = (eft: Eft) => {
  let t1 = ''
  if (eft.atk > 0) {
    const t = `atk+${eft.atk}`
    t1 += t1 === '' ? t : '  ' + t
  }
  if (eft.def > 0) {
    const t = `def+${eft.def}`
    t1 += t1 === '' ? t : ', ' + t
  }
  if (eft.hp > 0) {
    const t = `hp+${eft.hp}`
    t1 += t1 === '' ? t : ', ' + t
  }
  if (eft.gd > 0) {
    const t = `gold+${Math.floor(eft.gd * 1000) / 10}%`
    t1 += t1 === '' ? t : ', ' + t
  }
  if (eft.exp > 0) {
    const t = `exp+${Math.floor(eft.exp * 1000) / 10}%`
    t1 += t1 === '' ? t : ', ' + t
  }
  return t1 || '---'
}

export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath()

  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)

  ctx.closePath()
}

export const getNpcItemFromItem = (item: Item): NpcItem => {
  return {
    id: item.id,
    name: `${item.ln}(${item.name})`,
    count: 1,
    atk: item.atk || 0,
    def: item.def || 0,
  }
}

// Define a function to randomly select non-repeating items
export const selectRandomItems = (items: Item[], count: number): Item[] => {
  const selected: Item[] = []
  const availableItems = [...items]
  for (let i = 0; i < count && availableItems.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableItems.length)
    selected.push(availableItems[randomIndex])
    availableItems.splice(randomIndex, 1)
  }
  return selected
}

const getValueCountRange = (cityId: number) => {
  if (cityId >= 1 && cityId <= 3) return [1, 2]
  if (cityId >= 4 && cityId <= 6) return [2, 3]
  if (cityId >= 7 && cityId <= 10) return [2, 4]
  if (cityId >= 11 && cityId <= 13) return [3, 4]
  return [0, 0]
}

export const generateEft = (cityId: number, id: number) => {
  const eft: Eft = { atk: 0, def: 0, hp: 0, gd: 0, exp: 0 }
  const [minCount, maxCount] = getValueCountRange(cityId)
  const valueCount = randInt(maxCount, minCount)
  const params = Object.keys(eft)
  const shuffledParams = params.sort(() => rand() - 0.5)

  for (let i = 0; i < valueCount; i++) {
    const param = shuffledParams[i]
    const [min, max] = eftRanges[param as keyof typeof eftRanges]
    // The closer city.id is to 13 and the smaller the id, the larger the value can be obtained
    const cityFactor = (cityId - 1) / 12
    const idFactor = (100 - id) / 60 // Assume id range is 20-80
    const combinedFactor = cityFactor * idFactor
    switch (param) {
      case 'gd':
        eft.gd = (max - min) * combinedFactor * rand() + min
        break
      case 'exp':
        eft.exp = (max - min) * combinedFactor * rand() + min
        break
      default:
        eft[param as keyof Eft] = min + (max - min) * combinedFactor * rand()
        break
    }
  }

  eft.atk = Math.floor(eft.atk)
  eft.def = Math.floor(eft.def)
  eft.hp = Math.floor(eft.hp)
  eft.gd = Math.floor(eft.gd * 100) / 100
  eft.exp = Math.floor(eft.exp * 100) / 100

  return eft
}

export const checkNpcNeed = (all: All, currentNpc: Npc) => {
  const haveGold = all.hero.g >= currentNpc.nGd
  const haveItem = all.its.find(
    (item) => item.id === currentNpc.nItem.id && item.ct >= currentNpc.nItem.count
  )
  return {
    haveGold,
    haveItem,
  }
}