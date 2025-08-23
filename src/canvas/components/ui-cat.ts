import { all } from '../constants/global'

declare global {
  interface CanvasRenderingContext2D {
    wrap(f: () => void): void
  }
}

CanvasRenderingContext2D.prototype.wrap = function (f: () => void) {
  this.save()
  f()
  this.restore()
}

export const renderCat = (ctx: CanvasRenderingContext2D, paws: boolean, dead: boolean) => {
  const scale = all.s
  const CAT_RADIUS_X = 15 * scale
  const CAT_RADIUS_Y = 20 * scale
  const BANDANA_HEIGHT = 15 * scale
  const EYE_GAP = 8 * scale
  const WHISKER_LENGTH = 24 * scale

  // Body
  ctx.fillStyle = ctx.strokeStyle = '#000'
  ctx.fillRect(-CAT_RADIUS_X, -CAT_RADIUS_Y, CAT_RADIUS_X * 2, CAT_RADIUS_Y * 2)

  // Paws
  if (paws) {
    ctx.fillRect(0, 0, CAT_RADIUS_X + 5 * scale, 4 * scale)
    ctx.fillRect(0, 12 * scale, CAT_RADIUS_X + 5 * scale, 4 * scale)
  }

  // Ears
  ctx.beginPath()
  ctx.arc(0, -CAT_RADIUS_Y - CAT_RADIUS_X, CAT_RADIUS_X, Math.PI, 0, true)
  ctx.lineTo(CAT_RADIUS_X, -CAT_RADIUS_Y)
  ctx.lineTo(-CAT_RADIUS_X, -CAT_RADIUS_Y)
  ctx.fill()

  // Bandana
  ctx.fillStyle = ctx.strokeStyle = '#b12a34'
  ctx.fillRect(-CAT_RADIUS_X, -CAT_RADIUS_Y, CAT_RADIUS_X * 2, BANDANA_HEIGHT)

  // Medallion
  ctx.lineWidth = 1 * scale
  ctx.beginPath()
  ctx.arc(0, 7 * scale, 4 * scale, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(-CAT_RADIUS_X, 0)
  ctx.lineTo(0, 5 * scale)
  ctx.lineTo(CAT_RADIUS_X, 0)
  ctx.stroke()

  ctx.fillStyle = '#fff'

  ctx.textAlign = 'center'
  ctx.font = `${4 * scale}pt Courier`
  ctx.fillText('13', 0, 8.8 * scale)

  // Whiskers
  ctx.lineWidth = 1 * scale
  ctx.strokeStyle = '#000'
  ;[-1, 1].forEach((sign) =>
    ctx.wrap(() => {
      ctx.translate(0, -CAT_RADIUS_Y + BANDANA_HEIGHT)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(sign * WHISKER_LENGTH, -2 * scale)

      ctx.moveTo(0, 0)
      ctx.lineTo(sign * WHISKER_LENGTH, 2 * scale)

      ctx.stroke()
    })
  )

  ctx.fillStyle = '#fff'

  // Eyes
  ;[-EYE_GAP, EYE_GAP].forEach((x) =>
    ctx.wrap(() => {
      ctx.translate(x, -CAT_RADIUS_Y + BANDANA_HEIGHT / 2 + 2 * scale)

      if (Date.now() % 5000 < 100) {
        ctx.scale(1, 0.1)
      }

      // White
      ctx.beginPath()
      ctx.arc(0, 0, BANDANA_HEIGHT / 2 - 2 * scale, 0, Math.PI * 2)
      ctx.fill()

      // Black
      ctx.fillStyle = '#000'

      if (dead) {
        ;[Math.PI / 4, -Math.PI / 4].forEach((angle) =>
          ctx.wrap(() => {
            ctx.fillStyle = '#000'
            ctx.rotate(angle)
            ctx.fillRect(-5 * scale, -1 * scale, 10 * scale, 2 * scale)
          })
        )
      } else {
        ctx.scale(0.3, 1)
        ctx.beginPath()
        ctx.arc(0, 0, BANDANA_HEIGHT / 2 - 2 * scale, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  )

  // Snoot
  ctx.beginPath()
  ctx.arc(0, -CAT_RADIUS_Y + BANDANA_HEIGHT, 2 * scale, 0, Math.PI * 2, true)
  ctx.fill()

  // Tail
  const tipX = Math.sin(((Date.now() / 1000) * Math.PI * 2) / 2) * 3 * scale
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 5 * scale
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, CAT_RADIUS_Y - ctx.lineWidth)
  ctx.bezierCurveTo(
    -25 * scale,
    CAT_RADIUS_Y + 2 * scale,
    -25 * scale,
    CAT_RADIUS_Y - 10 * scale,
    -25 * scale + tipX,
    CAT_RADIUS_Y - 18 * scale
  )

  ctx.stroke()
}
