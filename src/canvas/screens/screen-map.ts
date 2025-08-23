import { all, saveGame } from '../constants/global'
import type { City, Npc } from '../types'
import { drawRoundedRect, initCityNpcs, isInBounds, numToUnitNum, rand } from '../utils/base-utils'
import { drawPerson } from '../components/ui-person'
import { ft, ftb } from '../../canvas-tool/style-utils'
import { initMove } from '../utils/move-utils'

export const drawHeroInfo = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  const hero = all.hero
  drawPerson(ctx, 135 * scale, 20 * scale, 2.2, '#77f')
  // Draw hero info
  ctx.font = ft(13 * scale)

  ctx.fillStyle = '#ccc'
  ctx.textAlign = 'left'

  ctx.fillText(`${hero.n}`, 155 * scale, 25 * scale)

  const weapon = all.its.find((item) => item.id === hero.wp)
  let weaponName = weapon ? weapon.name : '--'
  const armor = all.its.find((item) => item.id === hero.ar)
  let armorName = armor ? armor.name : '--'
  ctx.font = ft(9 * scale)
  ctx.fillText(
    `| Lv${hero.lv} | ${Math.floor(hero.yr)}y | G: ${numToUnitNum(hero.g)}`,
    225 * scale,
    24 * scale
  )
  ctx.fillText(
    `Atk: ${numToUnitNum(hero.atk)} [${weaponName}] | Def: ${numToUnitNum(hero.def)} [${armorName}]`,
    155 * scale,
    40 * scale
  )

  ctx.font = ft(10 * scale)
  const H_L_1 = 125 * scale
  const H_L_2 = 250 * scale
  const H_T_1 = 65 * scale
  const H_T_2 = 85 * scale
  ctx.fillText(
    `Exp: ${numToUnitNum(hero.exp)}(${Math.floor((hero.exp / hero.mExp) * 1000) / 10}%)`,
    H_L_1,
    H_T_2
  )

  ctx.fillText(`Member: ${numToUnitNum(hero.mbs.length)}`, H_L_2, H_T_1)
  ctx.fillStyle = hero.hp >= 40 ? '#ccc' : '#f00'
  ctx.fillText(`Hp : ${numToUnitNum(hero.hp)}/${numToUnitNum(hero.mHp)}`, H_L_1, H_T_1)
  ctx.fillStyle = hero.tps >= 500 ? '#ccc' : '#f00'
  ctx.fillText(`Troops: ${numToUnitNum(hero.tps)}`, H_L_2, H_T_2)
}

export const drawCity = (ctx: CanvasRenderingContext2D, city: City) => {
  const scale = all.s

  const id = city.id
  const isSelected = all.sCId === city.id
  const isHovered = all.hCId === city.id
  const isA = city.isA // New inactive state parameter
  // Modify color logic
  let fillColor = '#eee'
  if (!all.acs.includes(id)) {
    fillColor = '#666' // Inactive color
  } else if (!isA) {
    fillColor = '#aaa' // Inactive color
  } else if (isSelected) {
    fillColor = '#ddf' // Selected color
  } else if (isHovered) {
    fillColor = '#5722FF' // Hover color
  }

  ctx.fillStyle = fillColor
  const x = city.x * scale
  const y = (city.y + 100) * scale
  const w = city.w * scale
  const h = city.h * scale
  ctx.fillRect(x, y, w, h)

  const l = 0.02 * city.h * scale

  // Draw City gate start
  let strokeColor = '#333'
  if (isSelected || isHovered) {
    strokeColor = '#00F'
  }
  const gx = x + 13.7 * l
  const gy = y + 30 * l
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = l * 0.6
  ctx.strokeRect(gx + 2 * l, gy, 10 * l, 4 * l)
  ctx.strokeRect(gx + 5.5 * l, gy + 2 * l, 3 * l, 2 * l)
  ctx.strokeRect(gx, gy + 4 * l, 14 * l, 6 * l)

  ctx.beginPath()
  ctx.arc(gx + 7 * l, gy + 10 * l, 3.2 * l, Math.PI * 1, Math.PI * 2)
  ctx.stroke()
  ctx.closePath()
  // Draw City gate end

  ctx.font = ft(h * 0.4)
  let fontColor = '#000'
  if (!isA) {
    fontColor = '#333'
  } else if (isSelected || isHovered) {
    fontColor = '#00F'
  }

  ctx.fillStyle = fontColor
  ctx.textAlign = 'center'

  ctx.fillText(id.toString(), x + w / 2, y + h / 2)

  return { x, y, width: w, height: h, city }
}

export const drawNpc = (
  ctx: CanvasRenderingContext2D,
  npc: Npc,
  index: number,
  scale: number = 1
) => {
  const NPC_WIDTH = 60
  const NPC_HEIGHT = 36.65
  const NPC_MARGIN = 10
  const NPC_X = 260
  const NPC_Y = 110
  const isLeftColumn = index % 2 === 0
  const x = (isLeftColumn ? NPC_X : NPC_X + NPC_WIDTH + NPC_MARGIN) * scale
  const y = (NPC_Y + (NPC_HEIGHT + NPC_MARGIN) * Math.floor(index / 2)) * scale
  const width = NPC_WIDTH * scale // NPC size
  const height = NPC_HEIGHT * scale // NPC size
  // Draw NPC background
  const isHover = all.hNName === npc.n
  let fillColor = '#fff' // Default color
  if (isHover) {
    if (npc.t === 'B') {
      fillColor = '#FFbbbb' // Type B NPC color
    } else if (npc.t === 'S') {
      fillColor = '#ccFFcc' // Type A NPC color
    } else {
      fillColor = '#ddd' // Hover color
    }
  } else if (npc.t === 'B') {
    fillColor = '#FFcccc' // Type B NPC color
  } else if (npc.t === 'S') {
    fillColor = '#ddFFdd' // Type A NPC color
  }

  ctx.fillStyle = fillColor

  ctx.fillRect(x, y, width, height)

  // Draw NPC icon
  drawPerson(ctx, x + 12 * scale, y + 14 * scale, 1, '#000')

  // Draw NPC name
  ctx.font = ft(13 * scale)
  // type B bold
  if (npc.t === 'B' || npc.t === 'S') {
    ctx.font = ftb(14 * scale)
  }

  ctx.fillStyle = '#000' // Text color
  ctx.textAlign = 'center' // Horizontal center alignment

  const textMetrics = ctx.measureText(npc.n)
  const textHeight = textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent
  ctx.fillText(npc.n, x + width / 1.6, y + height / 2 + textHeight / 2) // Draw name
  return { x, y, width, height, npc }
}

const drawBagBtn = (ctx: CanvasRenderingContext2D, x: number, y: number, sf = 1) => {
  const scale = all.s
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 2 * scale
  const width = 32 * scale
  const height = 32 * scale
  drawRoundedRect(ctx, x, y, width, height, 6 * scale)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(x + width / 2, y + height / 4, width / 4, 0, Math.PI * 1, false)
  ctx.stroke()

  return {
    x: (x - 4 * scale) * sf,
    y: (y - 4 * scale) * sf,
    width: (width + 8 * scale) * sf,
    height: (height + 8 * scale) * sf,
  }
}

const drawTeamBtn = (ctx: CanvasRenderingContext2D, x: number, y: number, sf = 1) => {
  const scale = all.s
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 2 * scale
  const xx = 2.3
  drawPerson(ctx, x + 12 * scale, y + 8 * scale, xx, '#ccc')
  const xxx = xx * scale
  const iconSize = 5.2 * xxx
  const iconRadius = iconSize / 2
  ctx.beginPath()
  ctx.arc(x + 20 * scale, y + 8 * scale, iconRadius, Math.PI * 1.6, Math.PI * 2.4)
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 1 * xxx
  ctx.stroke()
  ctx.closePath()
  ctx.beginPath()
  ctx.arc(x + 20 * scale, y + 31 * scale, iconRadius * 2.1, Math.PI * 1.6, Math.PI * 2)
  ctx.stroke()
  ctx.closePath()

  return {
    x: (x - 4 * scale) * sf,
    y: (y - 4 * scale) * sf,
    width: 40 * scale * sf,
    height: 40 * scale * sf,
  }
}
const drawHomeBtn = (ctx: CanvasRenderingContext2D, x: number, y: number, sf = 1) => {
  const scale = all.s
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 2 * scale
  ctx.beginPath()
  ctx.moveTo(x, y + 12 * scale)
  ctx.lineTo(x + 16 * scale, y)
  ctx.lineTo(x + 32 * scale, y + 12 * scale)
  ctx.lineTo(x + 32 * scale, y + 32 * scale)
  ctx.lineTo(x + 21 * scale, y + 32 * scale)
  ctx.lineTo(x + 21 * scale, y + 20 * scale)
  ctx.lineTo(x + 11 * scale, y + 20 * scale)
  ctx.lineTo(x + 11 * scale, y + 32 * scale)
  ctx.lineTo(x, y + 32 * scale)
  ctx.lineTo(x, y + 12 * scale)
  ctx.closePath()
  ctx.stroke()

  return {
    x: (x - 4 * scale) * sf,
    y: (y - 4 * scale) * sf,
    width: 40 * scale * sf,
    height: 40 * scale * sf,
  }
}

const drawPeopleBtn = (ctx: CanvasRenderingContext2D, x: number, y: number, sf = 1) => {
  const scale = all.s
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 2 * scale

  const width = 32 * scale
  const height = 32 * scale

  const headRadius = 4 * scale
  ctx.beginPath()
  ctx.arc(x + 4 * scale, y + 4 * scale, headRadius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + 2 * scale, y + 31 * scale)
  ctx.lineTo(x + 2 * scale, y + 22 * scale)
  ctx.lineTo(x + 0 * scale, y + 22 * scale)
  ctx.lineTo(x + 0 * scale, y + 11 * scale)
  ctx.lineTo(x + 6 * scale, y + 11 * scale)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x + 16 * scale, y + 1 * scale, headRadius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + 12 * scale, y + 32 * scale)
  ctx.lineTo(x + 12 * scale, y + 21 * scale)
  ctx.lineTo(x + 10 * scale, y + 21 * scale)
  ctx.lineTo(x + 10 * scale, y + 8 * scale)
  ctx.lineTo(x + 22 * scale, y + 8 * scale)
  ctx.lineTo(x + 22 * scale, y + 21 * scale)
  ctx.lineTo(x + 20 * scale, y + 21 * scale)
  ctx.lineTo(x + 20 * scale, y + 32 * scale)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x + 28 * scale, y + 4 * scale, headRadius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + 30 * scale, y + 31 * scale)
  ctx.lineTo(x + 30 * scale, y + 22 * scale)
  ctx.lineTo(x + 32 * scale, y + 22 * scale)
  ctx.lineTo(x + 32 * scale, y + 11 * scale)
  ctx.lineTo(x + 26 * scale, y + 11 * scale)
  ctx.stroke()

  return {
    x: (x - 4 * scale) * sf,
    y: (y - 4 * scale) * sf,
    width: (width + 8 * scale) * sf,
    height: (height + 8 * scale) * sf,
  }
}

export const ScreenMap = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): ((x: number, y: number) => number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const scale = all.s

  drawHeroInfo(ctx)

  // Draw Lines

  ctx.fillStyle = '#555'
  // ctx.fillRect(110 * scale, 50 * scale, 290 * scale, 1);
  ctx.fillRect(110 * scale, 0, 1, 100 * scale)
  ctx.fillRect(0, 99 * scale, 400 * scale, 1)
  ctx.fillRect(250 * scale, 99 * scale, 1, 400 * scale)

  ctx.save()
  const scaleFactor = 0.85
  ctx.scale(scaleFactor, scaleFactor)
  const btnL = 22 * scale
  const btnT = 16 * scale
  const btnM = 56 * scale
  const homeBtnBounds = drawHomeBtn(ctx, btnL, btnT, scaleFactor)
  const bagBtnBounds = drawBagBtn(ctx, btnL + btnM, btnT, scaleFactor)
  const teamBtnBounds = drawTeamBtn(ctx, btnL, btnT + btnM, scaleFactor)
  const getTroopsBtnBounds = drawPeopleBtn(ctx, btnL + btnM, btnT + btnM, scaleFactor)
  ctx.restore()

  const cityBounds: Array<{ x: number; y: number; width: number; height: number; city: City }> = []

  all.cts.forEach((city) => {
    const cb = drawCity(ctx, city)
    cityBounds.push(cb)
  })

  const npcBounds: Array<{ x: number; y: number; width: number; height: number; npc: Npc }> = []
  const thisCityNpcs = all.cNpcs.filter(
    (npc) => all.hero.mbs.findIndex((item) => item.id === npc.id) === -1
  )

  thisCityNpcs.forEach((npc, i) => {
    const nb = drawNpc(ctx, npc, i, scale)
    npcBounds.push(nb)
  })

  // Return click handler function
  return (x: number, y: number): number => {
    // Check bag button click
    if (isInBounds(x, y, bagBtnBounds)) {
      return 1 // Bag button clicked
    }

    if (isInBounds(x, y, teamBtnBounds)) {
      return 2 // Team button clicked
    }

    if (isInBounds(x, y, homeBtnBounds)) {
      return 3 // Home button clicked
    }

    if (isInBounds(x, y, getTroopsBtnBounds)) {
      return 4 // Get Troops button clicked
    }

    for (let i = 0; i < cityBounds.length; i++) {
      if (isInBounds(x, y, cityBounds[i]) && all.cts[i].isA && all.cts[i].id !== all.sCId) {
        return 100 + cityBounds[i].city.id // Return 100 + index for city clicks
      }
    }

    for (let i = 0; i < npcBounds.length; i++) {
      if (isInBounds(x, y, npcBounds[i])) {
        return npcBounds[i].npc.id // Return 10 + index for item clicks
      }
    }

    return 0 // No click detected
  }
}

// Handle screen map click results
export const handleScreenMapClick = (result: number, draw: () => void) => {
  if (result === 1) {
    // Handle bag button click
    all.cs = 'I'
  } else if (result === 2) {
    // Handle team button click
    all.cs = 'T'
  } else if (result === 3) {
    // Handle Bag button click
    all.cs = 'H'
  } else if (result === 4) {
    // Handle Troops button click
    all.cs = 'TP'
  } else if (result >= 100000) {
    // Handle NPC clicks (result - 200 = npc.id)
    const npcId = result
    const npc = all.cNpcs.find((npc) => npc.id === npcId)
    if (npc) {
      // console.log(`NPC ${npc.n} clicked!`)
      if (npc.t === 'N' || npc.t === 'B') {
        all.cs = 'N'
        all.cNId = npc.id
      } else if (npc.t === 'S') {
        all.cs = 'I'
        all.inS = true
      }
    }
  } else if (result >= 100) {
    // Handle city clicks (result - 100 = city.id)
    const cityId = result - 100
    const selectedCity = all.cts.find((city) => city.id === all.sCId)
    if (
      selectedCity &&
      selectedCity.id !== cityId &&
      selectedCity.isA &&
      selectedCity.go.includes(cityId)
    ) {
      goCity(cityId)
    }
  }
}

const goCity = (id: number) => {
  all.sCId = id
  all.cts.forEach((city) => {
    city.isA = false
  })
  const city = all.cts.find((city) => city.id === id)
  if (city) {
    city.isA = true
    all.cNpcs = initCityNpcs(city, all.nps)
    city.go.forEach((id) => {
      const city = all.cts.find((city) => city.id === id)
      if (city && all.acs.includes(city.id)) {
        city.isA = true
      }
    })
  }
  initMove()
  if (all.c) {
    saveGame()
  }
}
