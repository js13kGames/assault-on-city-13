import { ft, ftb } from '../../canvas-tool/style-utils'
import { drawButton } from '../components/ui-button'
import { drawCloseBtn } from '../components/ui-close-btn'
import { drawTitle } from '../components/ui-title'
import { all } from '../constants/global'
import { isInBounds } from '../utils/base-utils'

export const ScreenStart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawTitle(ctx, 'Start Game')

  const scale = all.s

  const storyTexts = [
    'Number kingdom existed',
    'King 13-13 and ruled 13 cities',
    'Each city: boss 13',
    'Beat boss to advance',
    '13-13 took your cat',
    'Go to City 13',
    '13 years to save cat',
    'Good luck!',
  ]
  ctx.fillStyle = '#ccc'
  ctx.textAlign = 'center'

  ctx.font = ft(14 * scale)

  storyTexts.forEach((text, index) => {
    ctx.fillText(text, 200 * scale, (70 + index * 30) * scale)
  })

  const firstBtnBounds = drawButton(ctx, 130, 330, 'Start', all.hSBtn === 2, true)

  return (x: number, y: number) => {
    if (isInBounds(x, y, firstBtnBounds)) {
      return 2
    }

    return 0
  }
}

export const handleScreenStartClick = (result: number, draw: () => void) => {
  if (result === 2) {
    all.cs = 'M'
  }
}
