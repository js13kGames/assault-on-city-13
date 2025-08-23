import { all } from '../constants/global'
import { ft } from '../../canvas-tool/style-utils'

export const drawTitle = (ctx: CanvasRenderingContext2D, title = '', subTitle = ' ') => {
  const scale = all.s
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'

  ctx.font = ft(24 * scale)
  ctx.fillText(title, 200 * scale, 35 * scale)

  if (subTitle) {
    ctx.font = ft(16 * scale)
    ctx.fillStyle = '#ccc'
    ctx.fillText(subTitle, 200 * scale, 55 * scale)
  }
}
