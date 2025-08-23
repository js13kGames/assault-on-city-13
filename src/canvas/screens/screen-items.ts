import { all, saveGame } from '../constants/global'
import { drawButton } from '../components/ui-button'
import { drawCloseBtn } from '../components/ui-close-btn'
import { drawItem } from '../components/ui-item'
import { drawTitle } from '../components/ui-title'
import type { Item } from '../types'
import { clone, isInBounds } from '../utils/base-utils'
import { ft } from '../../canvas-tool/style-utils'

const checkHeroEquip = (item: Item, isEquip: boolean) => {
  const t = isEquip ? 1 : -1
  if (item.atk && item.atk > 0) {
    all.hero.atk += item.atk * t
  }
  if (item.def && item.def > 0) {
    all.hero.def += item.def * t
  }
  if (item.hp && item.hp > 0) {
    all.hero.mHp += item.hp * t
    if (all.hero.hp > all.hero.mHp) {
      all.hero.hp = all.hero.mHp
    }
  }
}

const drawBackgroundTable = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  const x = 18 * scale
  const y = 64 * scale
  const w = 364 * scale
  const h = 260 * scale
  const size = 52 * scale
  const lineSize = 0.4 * scale
  ctx.fillStyle = '#555'
  ctx.fillRect(x, y, w, h)
  ctx.lineWidth = lineSize
  ctx.strokeStyle = '#aaa'
  ctx.strokeRect(x, y + 1 * size, w, lineSize)
  ctx.strokeRect(x, y + 2 * size, w, lineSize)
  ctx.strokeRect(x, y + 3 * size, w, lineSize)
  ctx.strokeRect(x, y + 4 * size, w, lineSize)
  ctx.strokeRect(x + 1 * size, y + size, lineSize, h - size)
  ctx.strokeRect(x + 2 * size, y + size, lineSize, h - size)
  ctx.strokeRect(x + 3 * size, y + size, lineSize, h - size)
  ctx.strokeRect(x + 4 * size, y + size, lineSize, h - size)
  ctx.strokeRect(x + 5 * size, y + size, lineSize, h - size)
  ctx.strokeRect(x + 6 * size, y + size, lineSize, h - size)

  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2 * scale
  ctx.strokeRect(x - 1 * scale, y - 1 * scale, w + 2 * scale, h + 2 * scale)
}

const drawBagText = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  const selectedItem = all.its.find((item) => item.id === all.cIId)
  if (selectedItem) {
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'left'

    ctx.font = ft(18 * scale)
    let t1 = `${selectedItem.ln} ×${selectedItem.ct}`
    ctx.fillText(t1, 26 * scale, 87 * scale)
    let t2 = ``
    if (selectedItem.atk && selectedItem.atk > 0) {
      t2 += `Atk+${selectedItem.atk}`
    }
    if (selectedItem.def && selectedItem.def > 0) {
      t2 += `Def+${selectedItem.def}`
    }
    t2 += `  Buy: ${selectedItem.gd}  Sell: ${Math.floor(selectedItem.gd / 2)}`
    ctx.textAlign = 'left'
    ctx.font = ft(11 * scale)
    ctx.fillText(t2, 26 * scale, 105 * scale)

    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.fillText(`G: ${all.hero.g}`, 374 * scale, 105 * scale)
    const weapon = all.its.find((item) => item.id === all.hero.wp)
    let weaponName = weapon ? weapon.name : '---'
    const armor = all.its.find((item) => item.id === all.hero.ar)
    let armorName = armor ? armor.name : '---'
    ctx.fillText(`Weapon: ${weaponName}  Armor: ${armorName}`, 374 * scale, 86 * scale)
  }
}

export const ScreenItems = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Draw buttons with hover state
  const closeBtnBounds = drawCloseBtn(ctx, false)
  let firstBtnDisabled = false
  let secondBtnDisabled = false
  if (all.inS) {
    const selectedItem = all.its.find((item) => item.id === all.cIId)
    if (selectedItem) {
      firstBtnDisabled = selectedItem.ct >= 13
      if (all.cIId === all.hero.wp || all.cIId === all.hero.ar) {
        secondBtnDisabled = selectedItem.ct <= 1
      } else {
        secondBtnDisabled = selectedItem.ct <= 0
      }
    }
  } else {
    firstBtnDisabled = all.cIId === all.hero.wp || all.cIId === all.hero.ar
    secondBtnDisabled = all.cIId !== all.hero.wp && all.cIId !== all.hero.ar
  }

  const firstBtnBounds = drawButton(
    ctx,
    40,
    340,
    all.inS ? 'Buy' : 'Equip',
    all.hNBtn === 2,
    true,
    firstBtnDisabled
  )
  const secondBtnBounds = drawButton(
    ctx,
    220,
    340,
    all.inS ? 'Sell' : 'Unequip',
    all.hNBtn === 3,
    true,
    secondBtnDisabled
  )
  drawBackgroundTable(ctx)

  const iBX = 18
  const iBY = 64
  const iBSize = 52

  const itemBounds: Array<{ x: number; y: number; width: number; height: number; item: Item }> = []
  let items = clone(all.its)
  if (all.inS) {
    drawTitle(ctx, 'Merchant‌', `(${all.sCId}-7)`)
    items = all.its.filter(
      (item) =>
        item.ct > 0 ||
        (item.type === 1 && item.id <= all.sCId) ||
        (item.type === 2 && item.id <= all.sCId + 30)
    )
  } else {
    drawTitle(ctx, 'Bag')
    items = all.its.filter((item) => item.ct > 0)
  }

  if (all.cIId === -1 && items.length > 0) {
    all.cIId = items[0].id
  }
  items.forEach((item, i) => {
    const x = iBX + (i % 7) * iBSize
    const y = iBY + Math.floor(i / 7) * iBSize

    const isEquiped = item.id === all.hero.wp || item.id === all.hero.ar
    const bounds = drawItem(ctx, x, y + iBSize, item, 1, all.cIId === item.id, isEquiped)
    itemBounds.push(bounds)
  })

  drawBagText(ctx)

  // Unified click handler
  return (x: number, y: number) => {
    // Check item clicks
    for (let i = 0; i < itemBounds.length; i++) {
      if (isInBounds(x, y, itemBounds[i])) {
        return 100 + itemBounds[i].item.id // Return 10 + index for item clicks
      }
    }
    // Check close button
    if (isInBounds(x, y, closeBtnBounds)) {
      return 1
    }

    if (isInBounds(x, y, firstBtnBounds) && !firstBtnDisabled) {
      return 2
    }

    if (isInBounds(x, y, secondBtnBounds) && !secondBtnDisabled) {
      return 3
    }

    return 0
  }
}

export const handleScreenItemsClick = (result: number, draw: () => void) => {
  if (result === 1) {
    // Handle close logic
    all.cs = 'M'
    all.inS = false
    all.cIId = 0
  } else if (result === 2) {
    const item = all.its.find((item) => item.id === all.cIId)
    if (item) {
      if (all.inS) {
        if (all.hero.g >= item.gd && item.ct < 13) {
          all.hero.g -= item.gd
          item.ct += 1
        }
      } else {
        if (item.type === 1) {
          const currentWeapon = all.its.find((it) => it.id === all.hero.wp)
          if (currentWeapon) {
            checkHeroEquip(currentWeapon, false)
          }
          checkHeroEquip(item, true)
          all.hero.wp = item.id
        } else if (item.type === 2) {
          const currentArmor = all.its.find((it) => it.id === all.hero.ar)
          if (currentArmor) {
            checkHeroEquip(currentArmor, false)
          }
          checkHeroEquip(item, true)
          all.hero.ar = item.id
        }
      }
    }
    saveGame()
  } else if (result === 3) {
    const item = all.its.find((item) => item.id === all.cIId)
    if (item) {
      if (all.inS) {
        if (all.hero.wp === item.id || all.hero.ar === item.id) {
          if (item.ct > 1) {
            all.hero.g += Math.floor(item.gd / 2)
            item.ct -= 1
          }
        } else if (item.ct > 0) {
          all.hero.g += Math.floor(item.gd / 2)
          item.ct -= 1
        }
      } else {
        if (all.hero.wp === item.id || all.hero.ar === item.id) {
          checkHeroEquip(item, false)
          if (item.type === 1) {
            all.hero.wp = -1
          } else if (item.type === 2) {
            all.hero.ar = -1
          }
        }
      }
    }
    saveGame()
  } else if (result >= 100) {
    const itemIndex = result - 100
    const clickedItem = all.its.find((item) => item.id === itemIndex)
    if (clickedItem) {
      all.cIId = clickedItem.id
    }
  }
}
