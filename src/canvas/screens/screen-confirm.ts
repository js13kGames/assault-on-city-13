import { drawButton } from '../components/ui-button'
import { renderCat } from '../components/ui-cat'
import { drawTitle } from '../components/ui-title'
import { all, newGame, saveGame } from '../constants/global'
import { isInBounds } from '../utils/base-utils'

export const ScreenConfirm = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#333'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawTitle(ctx, 'Start Game')

  const scale = all.s
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'

  ctx.fillText('Start new game?', 200 * scale, 100 * scale)
  ctx.fillText('Progress will be lost.', 200 * scale, 140 * scale)

  ctx.wrap(() => {
    ctx.translate(200 * all.s, 330 * all.s)
    renderCat(ctx, true, false)
  })

  const firstBtnBounds = drawButton(ctx, 130, 240, 'Back', all.hCBtn === 2, true)
  const secondBtnBounds = drawButton(ctx, 130, 320, 'Confirm', all.hCBtn === 3, true)

  return (x: number, y: number) => {
    if (isInBounds(x, y, firstBtnBounds)) {
      return 2
    }
    if (isInBounds(x, y, secondBtnBounds)) {
      return 3
    }

    return 0
  }
}

export const handleScreenConfirmClick = (result: number, draw: () => void) => {
  if (result === 2) {
    all.cs = 'H'
  }
  if (result === 3) {
    newGame()
    saveGame()
  }
}
