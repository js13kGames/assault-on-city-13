import { all, load } from './constants/global'
import { setupEventHandlers } from './events'
import {
  ScreenConfirm,
  ScreenGameover,
  ScreenHome,
  ScreenMap,
  ScreenNpc,
  ScreenStart,
  ScreenTeam,
  ScreenTroops,
} from './screens'
import { ScreenItems } from './screens/screen-items'
import { ScreenMove } from './screens/screen-move'

/**
 * Canvas drawing utilities with responsive sizing
 */
export function setupCanvas() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')

  if (!canvas) {
    console.error('Canvas element not found')
    return
  }

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('Could not get 2d context from canvas')
    return
  }

  ctx.textBaseline = 'alphabetic'
  ctx.imageSmoothingEnabled = false

  load()

  // Drawing function that passes the scale factor
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    switch (all.cs) {
      case 'H':
        ScreenHome(ctx, canvas)
        break
      case 'M':
        ScreenMap(ctx, canvas)
        break
      case 'N':
        ScreenNpc(ctx, canvas)
        break
      case 'I':
        ScreenItems(ctx, canvas)
        break
      case 'T':
        ScreenTeam(ctx, canvas)
        break
      case 'V':
        ScreenMove(ctx, canvas)
        break
      case 'O':
        ScreenGameover(ctx, canvas)
        break
      case 'TP':
        ScreenTroops(ctx, canvas)
        break
      case 'S':
        ScreenStart(ctx, canvas)
        break
      case 'C':
        ScreenConfirm(ctx, canvas)
        break
      default:
        break
    }
  }

  // Set up event handlers
  const { handleMouseMove, handleClick, handleTouchStart, handleTouchMove, handleTouchEnd } =
    setupEventHandlers(canvas, draw)

  // Attach mouse event listeners
  canvas.addEventListener('mousemove', (e) => handleMouseMove(e, ctx, canvas))
  canvas.addEventListener('click', (e) => handleClick(e, ctx, canvas))

  // Attach touch event listeners
  canvas.addEventListener('touchstart', (e) => handleTouchStart(e, ctx, canvas))
  canvas.addEventListener('touchmove', (e) => handleTouchMove(e, ctx, canvas))
  canvas.addEventListener('touchend', (e) => handleTouchEnd(e, ctx, canvas))

  // Prevent touch events from being intercepted by browser default behavior
  canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false })
  canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false })

  // Function to resize canvas to match screen size
  const resize = () => {
    const container = canvas.parentElement
    if (!container) return

    // Set canvas dimensions to match container
    const dpr = window.devicePixelRatio || 1
    canvas.width = container.clientWidth * dpr
    canvas.height = container.clientHeight * dpr

    canvas.style.width = container.clientWidth + 'px'
    canvas.style.height = container.clientHeight + 'px'

    // Scale drawing context
    ctx.scale(dpr, dpr) // Subsequent drawings use logical coordinates

    // Redraw everything after resize
    draw()
  }

  // Initialize with correct size
  resize()

  // Return public API
  return {
    canvas,
    ctx,
    resize,
  }
}