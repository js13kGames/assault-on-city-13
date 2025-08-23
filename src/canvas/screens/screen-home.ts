import { all } from '../constants/global'
import { ft, ftb } from '../../canvas-tool/style-utils'
import { isInBounds } from '../utils/base-utils'
import { renderCat } from '../components/ui-cat'

const drawHomeInfo = (ctx: CanvasRenderingContext2D) => {
  const scale = all.s
  ctx.font = ft(28 * scale)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'

  ctx.fillText(`Assault on City 13`, 200 * scale, 95 * scale)
  ctx.font = ft(16 * scale)
  ctx.fillStyle = '#ccc'
  ctx.fillText(`Slay the Foe, Save the Black Cat`, 200 * scale, 130 * scale)
}

export const drawHomeButton = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  isHovered = false,
  isSmall = false
) => {
  const scale = all.s

  const btnX = x * scale
  const btnY = y * scale
  const btnWidth = 180 * scale
  const btnHeight = isSmall ? 40 * scale : 60 * scale

  // Draw button background
  ctx.fillStyle = isHovered ? '#666' : '#444'
  ctx.fillRect(btnX, btnY, btnWidth, btnHeight)

  // Add border
  ctx.strokeStyle = isHovered ? '#fff' : '#ccc'
  ctx.lineWidth = isHovered ? 2 * scale : 1 * scale
  ctx.strokeRect(btnX, btnY, btnWidth, btnHeight)

  // Draw button text
  ctx.fillStyle = isHovered ? '#ff0' : '#fff'
  const fontSize = isSmall ? 20 : 28
  ctx.font = ftb(fontSize * scale)
  ctx.textAlign = 'center'

  const textMetrics = ctx.measureText(text)
  const textHeight = textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent
  ctx.fillText(text, btnX + btnWidth / 2, btnY + btnHeight / 2 + textHeight / 2)

  return {
    x: btnX - 5 * scale,
    y: btnY - 5 * scale,
    width: btnWidth + 10 * scale,
    height: btnHeight + 10 * scale,
  }
}

export const ScreenHome = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#333'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawHomeInfo(ctx)
  const newGameBtnBounds = drawHomeButton(ctx, 110, all.c ? 170 : 210, 'New Game', all.hNBtn === 2)
  const continueBtnBounds = drawHomeButton(
    ctx,
    all.c ? 110 : -400,
    260,
    'Continue',
    all.hNBtn === 3
  )

  ctx.wrap(() => {
    ctx.translate(10 * all.s, 100 * all.s)
    ctx.rotate(Math.PI / 4)
    renderCat(ctx, true, false)
  })

  // Unified click handler
  return (x: number, y: number) => {
    // Check talk button
    if (isInBounds(x, y, newGameBtnBounds)) {
      return 2
    }

    // Check fight button
    if (isInBounds(x, y, continueBtnBounds)) {
      return 3
    }

    return 0
  }
}

export const handleScreenHomeClick = (result: number, draw: () => void) => {
  if (result === 2) {
    all.cs = 'C'
  } else if (result === 3) {
    all.cs = 'M'
  }
}
