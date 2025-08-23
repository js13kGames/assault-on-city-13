import { ft } from '../../canvas-tool/style-utils'
import { drawButton } from '../components/ui-button'
import { drawCloseBtn } from '../components/ui-close-btn'
import { drawPerson } from '../components/ui-person'
import { drawTitle } from '../components/ui-title'
import { all, saveGame } from '../constants/global'
import type { HeroMember } from '../constants/hero'
import { getAllMemberEft } from '../utils/fight-utils'
import { clone, getMemberAddText, isInBounds } from '../utils/base-utils'

export const drawMember = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  member: HeroMember,
  isSelected = false,
  isEquiped = false
): { x: number; y: number; width: number; height: number; member: HeroMember } => {
  const scale = all.s
  const itemX = x * scale
  const itemY = y * scale
  const { iW, iH } = getMemberItemBounds()

  if (isSelected) {
    ctx.fillStyle = '#222'
    ctx.fillRect(itemX + 1 * scale, itemY + 1 * scale, iW - 2 * scale, iH - 2 * scale)
    ctx.lineWidth = 2 * scale
    ctx.strokeStyle = isEquiped ? '#D19A5A' : '#fff'
    ctx.strokeRect(itemX + 1 * scale, itemY + 1 * scale, iW - 2 * scale, iH - 2 * scale)
  } else {
    if (isEquiped) {
      ctx.lineWidth = 2 * scale
      ctx.strokeStyle = '#D19A5A'
      ctx.strokeRect(itemX + 1 * scale, itemY + 1 * scale, iW - 2 * scale, iH - 2 * scale)
    }
  }
  drawPerson(ctx, itemX + 15 * scale, itemY + 10 * scale, 1, '#ddd')

  ctx.fillStyle = '#fff'
  ctx.font = ft(12 * scale)
  ctx.textAlign = 'left'

  ctx.fillText(`${member.name} Lv${member.lv}`, itemX + 24 * scale, itemY + 17 * scale)

  let t1 = ''
  if (member.eft.atk > 0) {
    const t = `Atk+${member.eft.atk}`
    t1 += t1 === '' ? t : '  ' + t
  }
  if (member.eft.def > 0) {
    const t = `Def+${member.eft.def}`
    t1 += t1 === '' ? t : '  ' + t
  }

  if (member.eft.hp > 0) {
    const t = `HP+${member.eft.hp}`
    t1 += t1 === '' ? t : '  ' + t
  }
  if (t1 !== '') {
    ctx.fillStyle = '#ccc'
    ctx.font = ft(10 * scale)
    ctx.textAlign = 'left'
    ctx.fillText(t1, itemX + 9 * scale, itemY + 33 * scale)
  }
  let t2 = ''
  if (member.eft.gd > 0) {
    const t = `Gold+${Math.floor(member.eft.gd * 1000) / 10}%`
    t2 += t2 === '' ? t : '  ' + t
  }
  if (member.eft.exp > 0) {
    ctx.fillStyle = '#ccc'
    ctx.font = ft(10 * scale)
    const t = `Exp+${Math.floor(member.eft.exp * 1000) / 10}%`
    t2 += t2 === '' ? t : '  ' + t
  }
  if (t2 !== '') {
    ctx.fillText(t2, itemX + 9 * scale, itemY + 46 * scale)
  }

  return {
    x: itemX,
    y: itemY,
    width: iW,
    height: iH,
    member: member,
  }
}

const getMemberItemBounds = () => {
  const scale = all.s
  const x = 18 * scale
  const y = 64 * scale
  const w = 364 * scale
  const h = 260 * scale
  const iW = w / 2
  const iH = h / 5
  return {
    x,
    y,
    w,
    h,
    iW,
    iH,
  }
}

const drawBackgroundTable = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  const { x, y, w, h, iW, iH } = getMemberItemBounds()
  const lineSize = 0.4 * scale
  ctx.fillStyle = '#333'
  ctx.fillRect(x, y, w, h)
  ctx.lineWidth = lineSize
  ctx.strokeStyle = '#aaa'
  ctx.strokeRect(x, y + 1 * iH, w, lineSize)
  ctx.strokeRect(x, y + 2 * iH, w, lineSize)
  ctx.strokeRect(x, y + 3 * iH, w, lineSize)
  ctx.strokeRect(x, y + 4 * iH, w, lineSize)
  ctx.strokeRect(x + 1 * iW, y + iH, lineSize, h - iH)

  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2 * scale
  ctx.strokeRect(x - 1 * scale, y - 1 * scale, w + 2 * scale, h + 2 * scale)
}

const drawTeamText = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  const selectedItem = all.nps.find((item) => item.id === all.cTId)
  if (selectedItem) {
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'left'

    ctx.font = ft(15 * scale)
    const mainMember = all.hero.mbs.find((item) => item.id === all.hero.mm)
    if (mainMember) {
      ctx.fillText(`Main: ${mainMember.name}`, 26 * scale, 87 * scale)
      ctx.font = ft(11 * scale)
      ctx.fillText(`(${getMemberAddText(mainMember.eft)}) × 2`, 116 * scale, 86 * scale)
    } else {
      ctx.fillText(`Main: ---`, 26 * scale, 87 * scale)
    }

    ctx.font = ft(11 * scale)
    ctx.fillStyle = '#ddd'
    ctx.fillText(`Total: ${getMemberAddText(getAllMemberEft())}`, 26 * scale, 105 * scale)
  }
}

export const ScreenTeam = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawTitle(ctx, 'Team')
  // Draw buttons with hover state
  const closeBtnBounds = drawCloseBtn(ctx, all.hTBtn === 1)

  let firstBtnDisabled = all.cTId === all.hero.mm
  let secondBtnDisabled = all.cTId === all.hero.mm
  const firstBtnBounds = drawButton(
    ctx,
    40,
    340,
    'Set main',
    all.hTBtn === 2,
    true,
    firstBtnDisabled
  )
  const secondBtnBounds = drawButton(
    ctx,
    220,
    340,
    'Remove',
    all.hTBtn === 3,
    true,
    secondBtnDisabled
  )
  drawBackgroundTable(ctx)

  const { x, y, iW, iH } = getMemberItemBounds()
  const iBX = x / all.s
  const iBY = y / all.s
  const iBW = iW / all.s
  const iBH = iH / all.s

  const itemBounds: Array<{
    x: number
    y: number
    width: number
    height: number
    member: HeroMember
  }> = []
  let members = []
  members = clone(all.hero.mbs)

  if (all.cTId === -1 && members.length > 0) {
    all.cTId = members[0].id
  }
  members.forEach((item, i) => {
    const x = iBX + (i % 2) * iBW
    const y = iBY + Math.floor(i / 2) * iBH

    const isEquiped = item.id === all.hero.mm
    const bounds = drawMember(ctx, x, y + iBH, item, all.cTId === item.id, isEquiped)
    itemBounds.push(bounds)
  })

  drawTeamText(ctx)

  // Unified click handler
  return (x: number, y: number) => {
    // Check item clicks
    for (let i = 0; i < itemBounds.length; i++) {
      if (isInBounds(x, y, itemBounds[i])) {
        return 100 + itemBounds[i].member.id // Return 10 + index for item clicks
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

export const handleScreenTeamClick = (result: number, draw: () => void) => {
  if (result === 1) {
    // Handle close logic
    all.cs = 'M'
    all.cTId = -1
  } else if (result === 2) {
    all.hero.mm = all.hero.mbs.find((item) => item.id === all.cTId)?.id || 0
    saveGame()
  } else if (result === 3) {
    if (all.hero.mm !== all.cTId) {
      all.hero.mbs = all.hero.mbs.filter((item) => item.id !== all.cTId)
      all.cTId = -1
      saveGame()
      draw()
    }
  } else if (result >= 100) {
    const itemIndex = result - 100
    const clickedItem = all.hero.mbs.find((item) => item.id === itemIndex)
    if (clickedItem) {
      all.cTId = clickedItem.id
    }
  }
}
