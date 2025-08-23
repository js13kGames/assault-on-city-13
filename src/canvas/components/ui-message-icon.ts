import { all } from '../constants/global'

export const drawMessageIcon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) => {
  const scale = all.s * size

  ctx.save()
  ctx.strokeStyle = 'rgb(0, 0, 0, 0)'
  ctx.fillStyle = 'rgb(195, 195, 195)'
  ctx.beginPath()
  ctx.moveTo(23 * scale + x, 3 * scale + y)
  ctx.bezierCurveTo(
    34 * scale + x,
    3 * scale + y,
    43 * scale + x,
    10.2 * scale + y,
    43 * scale + x,
    19 * scale + y
  )
  ctx.bezierCurveTo(
    43 * scale + x,
    27.8 * scale + y,
    34 * scale + x,
    35 * scale + y,
    23 * scale + x,
    35 * scale + y
  )
  ctx.bezierCurveTo(
    12 * scale + x,
    35 * scale + y,
    3 * scale + x,
    27.8 * scale + y,
    3 * scale + x,
    19 * scale + y
  )
  ctx.bezierCurveTo(
    3 * scale + x,
    10.2 * scale + y,
    12 * scale + x,
    3 * scale + y,
    23 * scale + x,
    3 * scale + y
  )
  ctx.closePath()
  ctx.fill('evenodd')
  ctx.beginPath()
  ctx.moveTo(19.3 * scale + x, 33.7 * scale + y)
  ctx.lineTo(10.3 * scale + x, 38.7 * scale + y)
  ctx.lineTo(10.3 * scale + x, 28.7 * scale + y)
  ctx.lineTo(19.3 * scale + x, 33.7 * scale + y)
  ctx.closePath()
  ctx.fill('evenodd')
  ctx.restore()
}
