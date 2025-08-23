import { ft } from '../../canvas-tool/style-utils'
import { drawButton } from '../components/ui-button'
import { drawCloseBtn } from '../components/ui-close-btn'
import { drawItem, drawItemArmor, drawItemSword } from '../components/ui-item'
import { drawMessageIcon } from '../components/ui-message-icon'
import { drawPerson } from '../components/ui-person'
import { addMember, all, ntd, saveGame, speed } from '../constants/global'
import { calHeroWinRule } from '../utils/fight-utils'
import {
  clone,
  drawRoundedRect,
  getMemberAddText,
  isInBounds,
  numToUnitNum,
  rand100,
  randInt,
} from '../utils/base-utils'
import { npcFight } from '../mechanics/npc-fight'
import { npcTalk } from '../mechanics/npc-talk'

const drawNpcInfo = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  const npc = all.nps.find((n) => n.id === all.cNId) || all.nps[0]
  if (!['F2', 'F3'].includes(all.nt.p)) {
    ctx.font = ft(28 * scale)

    ctx.textAlign = 'left'

    if (npc.t === 'B') {
      drawPerson(ctx, 66 * scale, 40 * scale, 4, '#f00')
      ctx.fillStyle = '#f00'
      ctx.fillText(`${npc.n}`, 95 * scale, 54 * scale)
      ctx.font = ft(10 * scale)
      ctx.fillText(`BOSS`, 55 * scale, 78 * scale)
    } else {
      drawPerson(ctx, 66 * scale, 40 * scale, 4, '#fff')
      ctx.fillStyle = '#fff'
      ctx.fillText(`${npc.n}`, 95 * scale, 54 * scale)
    }
  }

  ctx.font = ft(14 * scale)
  if (all.nt.p === 'N') {
    if (npc.t === 'B') {
      ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale)
    } else {
      ctx.fillText(`Lv${npc.lv}  ❤${npc.ht}`, 100 * scale, 78 * scale)
    }

    ctx.font = ft(16 * scale)
    const X_L = 40 * scale
    const X_R = 190 * scale
    const Y_T = 45 * scale
    const Y_M = 28 * scale

    ctx.fillStyle = '#fff'
    ctx.fillText(`Hp:     ${numToUnitNum(npc.h)}`, X_R, Y_T)
    ctx.fillText(`Troops: ${numToUnitNum(npc.tps)}`, X_R, Y_T + Y_M * 1)
    ctx.fillText(`Exp:    ${numToUnitNum(npc.exp)}`, X_R, Y_T + Y_M * 2)
    ctx.fillText(`Atk:    ${numToUnitNum(npc.atk)}`, X_R, Y_T + Y_M * 3)
    ctx.fillText(`Def:    ${numToUnitNum(npc.def)}`, X_R, Y_T + Y_M * 4)
    ctx.fillText(`G:      ${numToUnitNum(npc.g)}`, X_R, Y_T + Y_M * 5)

    ctx.fillStyle = '#bbb'
    ctx.font = ft(13 * scale)
    const rule = calHeroWinRule(all.hero, all.nps.find((n) => n.id === all.cNId)!)
    ctx.fillText(`Win chance:  ${rule.wc}%`, X_L, Y_T + Y_M * 6)

    const nItem = all.its.find((i) => i.id === npc.nItem.id)!
    ctx.fillText(`Join need:   100❤ + ${nItem.name} + ${npc.nGd}G`, X_L, Y_T + Y_M * 6.8)
    ctx.fillText(`Team effect: ${getMemberAddText(npc.eft)}`, X_L, Y_T + Y_M * 7.6)
    ctx.fillStyle = '#999'
    ctx.fillRect(X_L, 195 * scale, 320 * scale, 1 * scale)

    ctx.fillStyle = '#111'
    drawRoundedRect(ctx, X_L, 95 * scale, 140 * scale, 84 * scale, 6 * scale)
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1 * scale
    ctx.stroke()
    ctx.fill()
    ctx.fillStyle = '#ddd'
    ctx.font = ft(10 * scale)
    npc.items.forEach((item, index) => {
      const thisItem = all.its.find((i) => i.id === item.id)!
      ctx.fillText(item.name, X_L + 30 * scale, 118 * scale + index * 23 * scale)
      ctx.save()
      const scaleFactor = 0.3
      ctx.scale(scaleFactor, scaleFactor)
      if (thisItem.type === 1) {
        drawItemSword(
          ctx,
          (X_L / scale + 10) / scaleFactor,
          (108 + index * 23) / scaleFactor,
          thisItem.name,
          thisItem.id
        )
      } else {
        drawItemArmor(
          ctx,
          (X_L / scale + 10) / scaleFactor,
          (108 + index * 23) / scaleFactor,
          thisItem.name,
          thisItem.id
        )
      }
      ctx.restore()
    })
  } else if (all.nt.p === 'T') {
    ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale)
    drawMessageIcon(ctx, 120 * scale, 125 * scale, 3.5)
    ctx.font = ft(80 * scale)

    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'

    ctx.fillText(`${all.nt.d}`, 200 * scale, 200 * scale)
  } else if (all.nt.p === 'T2') {
    // Normal talk
    ctx.fillRect(199.5 * scale, 115 * scale, 1 * scale, 140 * scale)
    ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale)
    ctx.textAlign = 'center'

    ctx.fillStyle = '#f00'
    ctx.font = ft(60 * scale)
    ctx.fillText(`❤`, 100 * scale, 180 * scale)
    ctx.fillStyle = '#fff'
    ctx.font = ft(48 * scale)
    ctx.fillText(`HP`, 300 * scale, 180 * scale)
    ctx.font = ft(30 * scale)
    ctx.fillText(`${all.nt.tt.t1} ➔ ${all.nt.tt.t2}`, 100 * scale, 230 * scale)
    ctx.fillText(`${all.nt.tt.t3} ➔ ${all.nt.tt.t4}`, 300 * scale, 230 * scale)

    if (npc.ht >= 100) {
      ctx.font = ft(10 * scale)
      ctx.fillText(`${all.nt.tt.t5}`, 100 * scale, 250 * scale)
      ctx.fillText(`${all.nt.tt.t6}`, 300 * scale, 250 * scale)
    }
  } else if (all.nt.p === 'T3') {
    // join or not
    ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale)
    ctx.font = ft(16 * scale)
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(all.nt.tt.t1, 200 * scale, 120 * scale)
    ctx.fillText(`❤ 100`, 200 * scale, 150 * scale)
    ctx.fillText(all.nt.tt.t5, 200 * scale, 180 * scale)
    ctx.fillText(all.nt.tt.t6, 200 * scale, 210 * scale)
  } else if (all.nt.p === 'T4') {
    // join or not
    ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale)
    ctx.font = ft(16 * scale)

    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'

    ctx.fillText(`${all.nt.tt.t1}`, 200 * scale, 200 * scale)
  } else if (all.nt.p === 'F') {
    ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale)
    ctx.font = ft(130 * scale)

    ctx.fillStyle = all.nt.f
    ctx.textAlign = 'center'

    ctx.fillText(`⚔`, 200 * scale, 220 * scale)
  } else if (all.nt.p === 'F2') {
    // Fignt win
    // ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale);
    ctx.font = ft(30 * scale)
    ctx.fillStyle = '#0f0'
    ctx.textAlign = 'center'

    ctx.fillText(`WIN`, 200 * scale, 120 * scale)

    ctx.font = ft(16 * scale)
    ctx.fillText(`${npc.n} ❤-${all.nt.ft.t1}`, 200 * scale, 150 * scale)
    let hpTpsText = `Hp-${all.nt.ft.t2}`
    if (all.nt.ft.t3 !== '0') {
      hpTpsText += `Troops-${all.nt.ft.t3}`
    }
    ctx.fillText(hpTpsText, 200 * scale, 180 * scale)
    ctx.fillText(`G+${all.nt.ft.t4}   Exp+${all.nt.ft.t5}`, 200 * scale, 210 * scale)
    ctx.fillText(`${all.nt.ft.t6}`, 200 * scale, 240 * scale)
  } else if (all.nt.p === 'F3') {
    // Fignt lose
    // ctx.fillText(`Lv${npc.lv}`, 100 * scale, 78 * scale);
    ctx.font = ft(30 * scale)
    ctx.fillStyle = '#0ff'
    ctx.textAlign = 'center'

    ctx.fillText(`LOSE`, 200 * scale, 120 * scale)

    ctx.font = ft(16 * scale)
    ctx.fillText(`${npc.n} ❤-${all.nt.ft.t1}`, 200 * scale, 150 * scale)
    ctx.fillText(`Hp-${all.nt.ft.t2}`, 200 * scale, 180 * scale)
    ctx.fillText(`Troops-${all.nt.ft.t3}`, 200 * scale, 210 * scale)
  }
}

export const ScreenNpc = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Draw buttons with hover state
  drawNpcInfo(ctx)
  if (all.nt.p === 'N') {
    const closeBtnBounds = drawCloseBtn(ctx, all.hNBtn === 1)
    const talkBtnBounds = drawButton(ctx, 40, 310, '♡', all.hNBtn === 2, true)
    const fightBtnBounds = drawButton(ctx, 220, 310, '⚔', all.hNBtn === 3, true)
    // Unified click handler
    return (x: number, y: number) => {
      if (isInBounds(x, y, closeBtnBounds)) {
        return 1
      }
      // Check talk button
      if (isInBounds(x, y, talkBtnBounds)) {
        return 2
      }

      // Check fight button
      if (isInBounds(x, y, fightBtnBounds)) {
        return 3
      }

      return 0
    }
  } else if (['T2', 'T4', 'F2', 'F3'].includes(all.nt.p)) {
    const okBtnBounds = drawButton(ctx, 130, 300, 'OK', all.hNBtn === 2)
    return (x: number, y: number) => {
      if (isInBounds(x, y, okBtnBounds)) {
        return 1
      }
      return 0
    }
  } else if (['T3'].includes(all.nt.p)) {
    const noBtnBounds = drawButton(ctx, 40, 300, 'NO', all.hNBtn === 2)
    const yesBtnBounds = drawButton(ctx, 220, 300, 'YES', all.hNBtn === 2)
    return (x: number, y: number) => {
      if (isInBounds(x, y, noBtnBounds)) {
        return 11
      }
      if (isInBounds(x, y, yesBtnBounds)) {
        return 12
      }
      return 0
    }
  } else {
    return (x: number, y: number) => {
      return 0
    }
  }
}

export const handleScreenNpcClick = (result: number, draw: () => void) => {
  switch (result) {
    case 1:
      all.cs = 'M'
      all.nt = clone(ntd)
      break
    case 2:
      npcTalk(draw)
      break
    case 3:
      npcFight(draw)
      break
    case 11:
      all.cs = 'M'
      all.nt = clone(ntd)
      break
    case 12:
      const currentNpc = all.cNpcs.find((npc) => npc.id === all.cNId)
      if (currentNpc) {
        addMember(currentNpc)
        all.nt.tt.t1 = `Welcome ${currentNpc.n} to join the team`
        all.nt.p = 'T4'
      }
      break
  }
}
