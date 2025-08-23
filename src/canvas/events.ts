import { all } from './constants/global'
import {
  handleScreenConfirmClick,
  handleScreenGameoverClick,
  handleScreenHomeClick,
  handleScreenItemsClick,
  handleScreenMapClick,
  handleScreenMoveClick,
  handleScreenNpcClick,
  handleScreenStartClick,
  handleScreenTeamClick,
  handleScreenTroopsClick,
  ScreenConfirm,
  ScreenGameover,
  ScreenHome,
  ScreenItems,
  ScreenMap,
  ScreenMove,
  ScreenNpc,
  ScreenStart,
  ScreenTeam,
  ScreenTroops,
} from './screens'
import { initCityNpcs } from './utils/base-utils'

export type DrawFunction = () => void
export type ButtonActions = Record<string, () => void>

export interface EventHandlers {
  handleMouseMove: (e: MouseEvent, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
  handleClick: (e: MouseEvent, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
  handleTouchStart: (
    e: TouchEvent,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => void
  handleTouchMove: (e: TouchEvent, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
  handleTouchEnd: (e: TouchEvent, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
}

/**
 * Sets up event handlers for the canvas
 */
export const setupEventHandlers = (
  canvas: HTMLCanvasElement,
  draw: DrawFunction
): EventHandlers => {
  // Track mouse down state
  let isMouseDown = false
  
  canvas.addEventListener('mousedown', () => {
    isMouseDown = true
  })
  
  canvas.addEventListener('mouseup', () => {
    isMouseDown = false
  })

  // Add hover detection in handleMouseMove function
  const handleMouseMove = (
    e: MouseEvent,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (all.cs === 'I') {
      // Items
      const clickHandler = ScreenItems(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        // all.hNBtn = result;
      } else {
        canvas.style.cursor = 'default'
        // all.hNBtn = 0;
      }
    } else if (all.cs === 'N') {
      // Npc detail
      const clickHandler = ScreenNpc(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hNBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hNBtn = 0
      }
    } else if (all.cs === 'M') {
      const clickHandler = ScreenMap(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        // all.hNBtn = result;
      } else {
        canvas.style.cursor = 'default'
        // all.hNBtn = 0;
      }
    } else if (all.cs === 'T') {
      const clickHandler = ScreenTeam(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hTBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hTBtn = 0
      }
    } else if (all.cs === 'TP') {
      const clickHandler = ScreenTroops(ctx, canvas)
      const result = clickHandler(x, y, !isMouseDown) // Not treat as hover when mouse is down
      if (result === 5 || result === 6) {
        canvas.style.cursor = 'pointer'
        all.hTPBtn = result
        // Redraw when mouse is down or hovering
        draw()
      } else if (result) {
        canvas.style.cursor = 'pointer'
        all.hTPBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hTPBtn = 0
      }
    } else if (all.cs === 'C') {
      const clickHandler = ScreenConfirm(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hCBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hCBtn = 0
      }
    } else if (all.cs === 'S') {
      const clickHandler = ScreenStart(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hSBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hSBtn = 0
      }
    } else if (all.cs === 'O') {
      const clickHandler = ScreenGameover(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hOBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hOBtn = 0
      }
    } else if (all.cs === 'V') {
      const clickHandler = ScreenMove(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hVBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hVBtn = 0
      }
    } else if (all.cs === 'H') {
      const clickHandler = ScreenHome(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        canvas.style.cursor = 'pointer'
        all.hHBtn = result
      } else {
        canvas.style.cursor = 'default'
        all.hHBtn = 0
      }
    }
    // draw();
  }

  // Add click detection in handleClick function
  const handleClick = (e: MouseEvent, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (all.cs === 'I') {
      const clickHandler = ScreenItems(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        handleScreenItemsClick(result, draw)
      }
    } else if (all.cs === 'N') {
      const clickHandler = ScreenNpc(ctx, canvas)
      const result = clickHandler(x, y)
      if (result) {
        handleScreenNpcClick(result, draw)
      }
    } else if (all.cs === 'M') {
      const clickHandler = ScreenMap(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenMapClick(result, draw)
      }
    } else if (all.cs === 'T') {
      const clickHandler = ScreenTeam(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenTeamClick(result, draw)
      }
    } else if (all.cs === 'TP') {
      const clickHandler = ScreenTroops(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenTroopsClick(result, draw)
      }
    } else if (all.cs === 'S') {
      const clickHandler = ScreenStart(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenStartClick(result, draw)
      }
    } else if (all.cs === 'C') {
      const clickHandler = ScreenConfirm(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenConfirmClick(result, draw)
      }
    } else if (all.cs === 'O') {
      const clickHandler = ScreenGameover(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenGameoverClick(result, draw)
      }
    } else if (all.cs === 'V') {
      const clickHandler = ScreenMove(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenMoveClick(result, draw)
      }
    } else if (all.cs === 'H') {
      const clickHandler = ScreenHome(ctx, canvas)
      const result = clickHandler(x, y)
      if (result > 0) {
        handleScreenHomeClick(result, draw)
      }
    }
    draw()
  }

  // Handle touch start event
  const handleTouchStart = (
    e: TouchEvent,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    // Call same logic as mouse move
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent, ctx, canvas)
  }

  // Handle touch move event
  const handleTouchMove = (
    e: TouchEvent,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    // Force update slider position (equivalent to mouse down drag)
    const clickHandler = ScreenTroops(ctx, canvas)
    const result = clickHandler(x, y, false) // Not treat as hover
    if (result === 5 || result === 6) {
      draw()
    }
  }

  // Handle touch end event
  const handleTouchEnd = (
    e: TouchEvent,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    e.preventDefault()
    const touch = e.changedTouches[0]
    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    // Call same logic as mouse click
    handleClick({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent, ctx, canvas)
  }

  return { handleMouseMove, handleClick, handleTouchStart, handleTouchMove, handleTouchEnd }
}