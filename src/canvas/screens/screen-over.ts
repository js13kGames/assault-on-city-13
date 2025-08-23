import { ft, ftb } from '../../canvas-tool/style-utils'
import { drawButton } from '../components/ui-button'
import { renderCat } from '../components/ui-cat'
import { all, newGame } from '../constants/global'
import { isInBounds, numToUnitNum } from '../utils/base-utils'

const drawInfo = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  ctx.textAlign = 'left'
  ctx.fillStyle = '#333'
  ctx.fillRect(20 * scale, 20 * scale, 360 * scale, 65 * scale)
  let isWin = all.ot.t === 'W'
  // isWin = false
  if (isWin) {
    ctx.fillStyle = '#0f0'
  } else {
    ctx.fillStyle = '#f00'
  }
  ctx.wrap(() => {
    ctx.translate(64 * all.s, 58 * all.s)
    // ctx.rotate(Math.PI / 4)
    isWin ? renderCat(ctx, true, false) : renderCat(ctx, false, true)
  })
  const overText1 = isWin ? 'Congratulations!' : 'Game Over!'
  const overText2 = isWin ? 'You saved Black Cat!' : "You didn't save Black Cat!"
  ctx.font = ft(20 * scale)
  ctx.fillText(overText1, 110 * scale, 47 * scale)
  ctx.font = ftb(16 * scale)
  ctx.fillText(overText2, 110 * scale, 73 * scale)
  ctx.fillRect(20 * scale, 85 * scale, 360 * scale, 1 * scale)
  // over information
  ctx.fillStyle = isWin ? '#ccc' : '#aaa'

  ctx.font = ft(12 * scale)
  const X_1 = 50 * scale
  const X_2 = 230 * scale
  const Y = 120 * scale
  const Y_M = 30 * scale
  ctx.fillText(`Year  : ${Math.floor(all.ot.h.yr)}`, X_1, Y)
  ctx.fillText(`Lv    : ${all.ot.h.lv}`, X_1, Y + Y_M * 1)
  ctx.fillText(`Atk   : ${all.ot.h.atk}`, X_1, Y + Y_M * 2)
  ctx.fillText(`Def   : ${all.ot.h.def}`, X_1, Y + Y_M * 3)
  ctx.fillText(`Exp   : ${all.ot.h.exp}`, X_1, Y + Y_M * 4)
  ctx.fillText(`Gold  : ${numToUnitNum(all.ot.h.g)}`, X_1, Y + Y_M * 5)

  ctx.fillText(`Troops   : ${numToUnitNum(all.ot.h.tps)}`, X_2, Y)
  ctx.fillText(`City     : ${Math.max(...all.ot.acs)}`, X_2, Y + Y_M * 1)
  ctx.fillText(`Member   : ${all.ot.h.mbs.length}`, X_2, Y + Y_M * 2)
  ctx.fillText(`Win Boss : ${Math.max(...all.ot.acw)}`, X_2, Y + Y_M * 3)
  const weaponName = all.its.find((item) => item.id === all.ot.h.wp)?.name || '--'
  ctx.fillText(`Top Sword: ${weaponName}`, X_2, Y + Y_M * 4)
  const armorName = all.its.find((item) => item.id === all.ot.h.ar)?.name || '--'
  ctx.fillText(`Top Armor: ${armorName}`, X_2, Y + Y_M * 5)

  ctx.fillStyle = '#fff'
  ctx.fillText(`Reason: ${all.ot.r}`, X_1, Y + Y_M * 6)
}

export const ScreenGameover = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // drawTitle(ctx, 'Game Over')
  // Draw buttons with hover state
  const firstBtnBounds = drawButton(ctx, 40, 340, 'New', all.hOBtn === 2, true)
  const SecondBtnBounds = drawButton(ctx, 220, 340, 'Home', all.hOBtn === 3, true)

  drawInfo(ctx)

  // Unified click handler
  return (x: number, y: number) => {
    // new game
    if (isInBounds(x, y, firstBtnBounds)) {
      return 2
    }
    // home button
    if (isInBounds(x, y, SecondBtnBounds)) {
      return 3
    }

    return 0
  }
}

export const handleScreenGameoverClick = (result: number, draw: () => void) => {
  if (result === 2) {
    newGame()
    all.cs = 'S'
  } else if (result === 3) {
    // home
    all.cs = 'H'
  }
}
