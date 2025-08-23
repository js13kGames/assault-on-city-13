import { ft, ftb } from '../../canvas-tool/style-utils'
import { drawButton } from '../components/ui-button'
import { drawCloseBtn } from '../components/ui-close-btn'
import { drawTitle } from '../components/ui-title'
import { all } from '../constants/global'
import { isInBounds } from '../utils/base-utils'

export const ScreenMove = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const thisCity = all.cts.find((city) => city.id === all.sCId)
  drawTitle(ctx, `Move to city ${thisCity?.id}`)
  const closeBtnBounds = drawCloseBtn(ctx, all.hVBtn === 1)
  // Draw buttons with hover state
  const scale = all.s
  const X = 200 * scale
  const Y = 80 * scale
  const Y_M = 66 * scale
  all.mv.evs.forEach((mv, i) => {
    ctx.fillStyle = '#ccc'
    ctx.textAlign = 'center'

    ctx.font = ftb(24 * scale)
    ctx.fillText(mv.h, X, Y + Y_M * i)
    ctx.fillStyle = '#fff'
    ctx.font = ft(16 * scale)
    ctx.fillText(mv.d, X, Y + Y_M * i + 25 * scale)
  })

  const firstBtnBounds = drawButton(ctx, 130, 340, 'Close', all.hVBtn === 2, true)

  return (x: number, y: number) => {
    // Check close button
    if (isInBounds(x, y, closeBtnBounds)) {
      return 1
    }

    if (isInBounds(x, y, firstBtnBounds)) {
      return 2
    }

    return 0
  }
}

export const handleScreenMoveClick = (result: number, draw: () => void) => {
  if (result === 1) {
    // Click close button
    all.cs = 'M'
  } else if (result === 2) {
    // Click close button
    all.cs = 'M'
  }
}
