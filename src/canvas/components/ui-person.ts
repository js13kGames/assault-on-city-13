import { all } from '../constants/global'

export const drawPerson = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  xx: number = 1,
  color: string = '#000'
) => {
  const scale = all.s * xx
  const iconSize = 5.2 * scale
  const iconRadius = iconSize / 2
  ctx.beginPath()
  ctx.arc(x, y, iconRadius, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 1 * scale
  ctx.stroke()
  ctx.closePath()
  ctx.beginPath()
  ctx.arc(x, y + 10 * scale, iconRadius * 2.1, Math.PI * 1, Math.PI * 2)
  ctx.stroke()
  ctx.closePath()
}
