import { all } from '../constants/global'
import { itemColors } from '../constants/default-data'
import type { Item } from '../types'
import { ft } from '../../canvas-tool/style-utils'

export const drawItemSword = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  name: string,
  id: number
) => {
  const scale = all.s
  const iX = x * scale
  const iY = y * scale
  ctx.lineWidth = 1 * scale
  ctx.fillStyle = itemColors[id]
  ctx.strokeStyle = '#000'
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(iX + 12.776 * scale, iY + 25.292 * scale)
  ctx.lineTo(iX + 19.919 * scale, iY + 31.9 * scale)
  ctx.lineTo(iX + 10.632 * scale, iY + 40.49 * scale)
  ctx.lineTo(iX + 3.489 * scale, iY + 33.882 * scale)
  ctx.lineTo(iX + 12.776 * scale, iY + 25.292 * scale)
  ctx.closePath()
  ctx.fill('evenodd')
  ctx.stroke()
  ctx.restore()
  ctx.save()
  // ctx.fillStyle = '#333333';
  ctx.beginPath()
  ctx.moveTo(iX + 35.635 * scale, iY + 4.147 * scale)
  ctx.lineTo(iX + 43.493 * scale, iY + 3.486 * scale)
  ctx.lineTo(iX + 42.779 * scale, iY + 10.755 * scale)
  ctx.lineTo(iX + 22.777 * scale, iY + 29.257 * scale)
  ctx.lineTo(iX + 15.633 * scale, iY + 22.649 * scale)
  ctx.lineTo(iX + 35.635 * scale, iY + 4.147 * scale)
  ctx.closePath()
  ctx.fill('evenodd')
  ctx.stroke()
  ctx.restore()
  ctx.save()
  // ctx.fillStyle = 'rgb(51, 51, 51)';
  ctx.beginPath()
  ctx.moveTo(iX + 11.347 * scale, iY + 17.363 * scale)
  ctx.lineTo(iX + 28.491 * scale, iY + 33.222 * scale)
  ctx.lineTo(iX + 24.205 * scale, iY + 37.186 * scale)
  ctx.lineTo(iX + 7.061 * scale, iY + 21.327 * scale)
  ctx.lineTo(iX + 11.347 * scale, iY + 17.363 * scale)
  ctx.closePath()
  ctx.fill('evenodd')
  ctx.stroke()
  ctx.restore()
  ctx.save()
  ctx.translate(iX + 25.5 * scale, iY + 20.5 * scale)
  ctx.rotate(Math.PI / -4)
  ctx.fillStyle = '#fff'
  ctx.font = ft(6 * scale)
  ctx.textAlign = 'center'

  ctx.fillText(name, 0, 1.5 * scale)
  ctx.restore()
}
export const drawItemArmor = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  name: string,
  id: number
) => {
  const scale = all.s
  const iX = x * scale
  const iY = y * scale
  ctx.lineWidth = 1 * scale
  ctx.fillStyle = itemColors[id - 30]
  ctx.strokeStyle = '#000'
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(iX + 3.5 * scale, iY + 3.5 * scale)
  ctx.lineTo(iX + 13.5 * scale, iY + 3.5 * scale)
  ctx.lineTo(iX + 20.5 * scale, iY + 10.5 * scale)
  ctx.lineTo(iX + 27.5 * scale, iY + 3.5 * scale)
  ctx.lineTo(iX + 37.5 * scale, iY + 3.5 * scale)
  ctx.lineTo(iX + 37.5 * scale, iY + 14.5 * scale)
  ctx.lineTo(iX + 31.5 * scale, iY + 14.5 * scale)
  ctx.lineTo(iX + 31.5 * scale, iY + 33.5 * scale)
  ctx.lineTo(iX + 9.5 * scale, iY + 33.5 * scale)
  ctx.lineTo(iX + 9.5 * scale, iY + 14.5 * scale)
  ctx.lineTo(iX + 3.5 * scale, iY + 14.5 * scale)
  ctx.lineTo(iX + 3.5 * scale, iY + 3.5 * scale)
  ctx.closePath()
  ctx.fill('evenodd')
  ctx.stroke()
  ctx.restore()
  ctx.save()
  ctx.translate(iX + 21 * scale, iY + 22 * scale)
  ctx.fillStyle = '#fff'
  ctx.font = ft(6 * scale)
  ctx.textAlign = 'center'

  ctx.fillText(name, 0, 1.4 * scale)
  ctx.restore()
}

export const drawItem = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  item: Item,
  xx: number = 1,
  isSelected = false,
  isEquiped = false
): { x: number; y: number; width: number; height: number; item: Item } => {
  let scale = all.s
  const itemX = x * scale
  const itemY = y * scale
  scale *= xx
  const itemSize = 52 * scale * xx
  const w = itemSize
  const h = itemSize

  if (isSelected) {
    ctx.fillStyle = '#222'
    ctx.fillRect(itemX + 1 * scale, itemY + 1 * scale, w - 2 * scale, h - 2 * scale)
    ctx.lineWidth = 2 * scale
    ctx.strokeStyle = isEquiped ? '#D19A5A' : '#fff'
    ctx.strokeRect(itemX + 1 * scale, itemY + 1 * scale, w - 2 * scale, h - 2 * scale)
  } else {
    if (isEquiped) {
      ctx.lineWidth = 2 * scale
      ctx.strokeStyle = '#D19A5A'
      ctx.strokeRect(itemX + 1 * scale, itemY + 1 * scale, w - 2 * scale, h - 2 * scale)
    }
  }
  if (item.type === 1) {
    drawItemSword(ctx, x + 3, y + 6, item.name, item.id)
  } else if (item.type === 2) {
    drawItemArmor(ctx, x + 6, y + 12, item.name, item.id)
  }

  ctx.fillStyle = '#fff'
  ctx.font = ft(12 * scale)
  ctx.textAlign = 'left'

  ctx.fillText(item.ct.toString(), itemX + 3 * scale, itemY + 11 * scale)

  return {
    x: itemX,
    y: itemY,
    width: w,
    height: h,
    item,
  }
}
