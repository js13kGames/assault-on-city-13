import { all } from '../constants/global'

export const drawCloseBtn = (ctx: CanvasRenderingContext2D, isHovered = false) => {
  const scale = all.s
  const btnSize = 20 * scale
  const btnPadding = 20 * scale
  const btnX = 360 * scale
  const btnY = btnPadding

  // Draw X shape
  ctx.strokeStyle = isHovered ? '#ff0' : '#fff'
  ctx.lineWidth = 2 * scale
  ctx.beginPath()
  ctx.moveTo(btnX, btnY)
  ctx.lineTo(btnX + btnSize, btnY + btnSize)
  ctx.moveTo(btnX + btnSize, btnY)
  ctx.lineTo(btnX, btnY + btnSize)
  ctx.stroke()

  return {
    x: btnX - 10 * scale,
    y: btnY - 10 * scale,
    width: btnSize + 20 * scale,
    height: btnSize + 20 * scale,
  }
}
