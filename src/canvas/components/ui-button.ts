import { ftb } from '../../canvas-tool/style-utils'
import { all } from '../constants/global'

export const drawButton = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  isHovered = false,
  isSmall = false,
  isDisabled = false
) => {
  const scale = all.s

  const btnX = x * scale
  const btnY = y * scale
  const btnWidth = 140 * scale
  const btnHeight = isSmall ? 40 * scale : 60 * scale

  // Draw button background
  ctx.fillStyle = isDisabled ? '#222' : isHovered ? '#666' : '#444'
  ctx.fillRect(btnX, btnY, btnWidth, btnHeight)

  // Add border
  ctx.strokeStyle = isDisabled ? '#999' : isHovered ? '#fff' : '#ccc'
  ctx.lineWidth = isDisabled ? 1 * scale : isHovered ? 2 * scale : 1 * scale
  ctx.strokeRect(btnX, btnY, btnWidth, btnHeight)

  // Draw button text
  ctx.fillStyle = isDisabled ? '#777' : isHovered ? '#ff0' : '#fff'
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
