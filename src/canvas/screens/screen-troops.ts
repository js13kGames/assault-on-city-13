import { ft, ftb } from '../../canvas-tool/style-utils'
import { drawButton } from '../components/ui-button'
import { drawCloseBtn } from '../components/ui-close-btn'
import { drawTitle } from '../components/ui-title'
import { all, saveGame } from '../constants/global'
import { isInBounds } from '../utils/base-utils'

// Define slider state
let sliderValue = 0
let maxTroops = 0
let pricePerTroop = 10
let totalPrice = 0

// Add notification variables
let notificationMessage = ''
let notificationTimestamp = 0

// Calculate price and max troops
const calculatePriceAndMax = () => {
  // Troops are stored in all.hero.tps, gold is stored in all.hero.gd
  const currentTroops = all.hero.tps || 0
  const currentGold = all.hero.g || 0

  // Determine unit price
  if (currentTroops < 5000) {
    pricePerTroop = 10
  } else if (currentTroops < 7500) {
    pricePerTroop = 15
  } else if (currentTroops < 10000) {
    pricePerTroop = 20
  } else {
    pricePerTroop = 25 // For cases over 10000
  }

  // Calculate maximum purchasable troops
  maxTroops = currentGold > 0 ? Math.floor(currentGold / pricePerTroop) : 0

  // Ensure slider value does not exceed maximum
  if (sliderValue > maxTroops) {
    sliderValue = maxTroops
  }

  // Calculate total price
  totalPrice = sliderValue * pricePerTroop
}

const drawSlider = (ctx: CanvasRenderingContext2D, scale: number) => {
  // Draw slider
  const sliderX = 60 * scale
  const sliderY = 180 * scale
  const sliderWidth = 280 * scale
  const sliderHeight = 20 * scale

  // Slider background
  ctx.fillStyle = '#444'
  ctx.fillRect(sliderX, sliderY, sliderWidth, sliderHeight)

  // Current slider value
  const sliderValueWidth = maxTroops > 0 ? (sliderValue / maxTroops) * sliderWidth : 0
  ctx.fillStyle = '#66f'
  ctx.fillRect(sliderX, sliderY, sliderValueWidth, sliderHeight)

  // Slider indicator - corrected position calculation
  const indicatorX = sliderX + sliderValueWidth
  // Ensure indicator does not exceed slider bounds
  const clampedIndicatorX = Math.max(sliderX, Math.min(sliderX + sliderWidth, indicatorX))
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(clampedIndicatorX, sliderY + sliderHeight / 2, 15 * scale, 0, Math.PI * 2)
  ctx.fill()

  return {
    sliderX,
    sliderY,
    sliderWidth,
    sliderHeight,
  }
}

export const ScreenTroops = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawTitle(ctx, 'Get troops')
  const closeBtnBounds = drawCloseBtn(ctx, all.hTPBtn === 1)

  // Calculate price and max troops
  calculatePriceAndMax()

  // Display current troops and gold
  const scale = all.s
  const currentTroops = all.hero.tps || 0
  const currentGold = all.hero.g || 0
  const centerX = (all.baseW * scale) / 2 // Calculate center using baseW and scale

  ctx.fillStyle = '#fff'
  // Implement ftb function (assuming it's short for font bold)

  ctx.font = ft(15 * scale)
  ctx.textAlign = 'center'
  ctx.fillText(`You have troops: ${currentTroops}, gold: ${currentGold}`, centerX, 80 * scale)

  // Display selected troops and price
  ctx.fillStyle = '#fff'
  ctx.font = ft(20 * scale)
  ctx.textAlign = 'center'
  ctx.fillText(`Troops to recruit: ${sliderValue}`, centerX, 130 * scale)
  ctx.fillText(`Total price: ${totalPrice} G`, centerX, 160 * scale)

  const { sliderX, sliderY, sliderWidth, sliderHeight } = drawSlider(ctx, scale)

  // Display notification message
  if (Date.now() - notificationTimestamp < 2000) {
    ctx.fillStyle = '#ff0'
    ctx.font = ft(15 * scale)
    ctx.textAlign = 'center'
    ctx.fillText(notificationMessage, centerX, 230 * scale)
  }

  // Draw Get troops button
  const getTroopsBtnBounds = drawButton(ctx, 140, 250, 'Get troops', all.hTPBtn === 2, true)

  // Adjust bottom close button position to ensure visibility within canvas
  const bottomCloseBtnBounds = drawButton(ctx, 140, 340, 'Close', all.hTPBtn === 3, true)

  // Store slider area
  const sliderBounds = {
    x: sliderX - 10 * scale,
    y: sliderY - 10 * scale,
    width: sliderWidth + 20 * scale,
    height: sliderHeight + 20 * scale,
  }

  // Unified click handler
  return (x: number, y: number, isHover = false) => {
    // Check close button
    if (isInBounds(x, y, closeBtnBounds)) {
      return 1
    }

    // Check bottom close button
    if (isInBounds(x, y, bottomCloseBtnBounds)) {
      return 3
    }

    // Check get troops button
    if (isInBounds(x, y, getTroopsBtnBounds)) {
      return 2
    }

    // Check slider interaction
    if (isInBounds(x, y, sliderBounds)) {
      // Update slider value when not hovering (click or drag)
      if (!isHover) {
        const relativeX = x - sliderX
        const percentage = Math.max(0, Math.min(1, relativeX / sliderWidth))
        sliderValue = Math.round(percentage * maxTroops)
        totalPrice = sliderValue * pricePerTroop
        // Return 5 to indicate slider update
        return 5
      }
      // Return 6 to indicate hover over slider
      return 6
    }

    return 0
  }
}

export const handleScreenTroopsClick = (result: number, draw: () => void) => {
  if (result === 1 || result === 3) {
    // Handle close logic
    all.cs = 'M'
  } else if (result === 2) {
    if (sliderValue > 0 && totalPrice <= (all.hero.g || 0)) {
      // Decrease gold
      all.hero.g = (all.hero.g || 0) - totalPrice
      // Increase troops
      all.hero.tps = (all.hero.tps || 0) + sliderValue
      // Save recruited troops count
      const recruitedTroops = sliderValue
      // Reset slider
      sliderValue = 0
      // Set notification message
      notificationMessage = 'Successfully recruited ' + recruitedTroops + ' troops!'
      notificationTimestamp = Date.now()
      saveGame()
      // Return to main menu
      // all.cs = 'M'
    } else if (sliderValue === 0) {
      // Prompt to select troops
      notificationMessage = 'Please select troops to recruit'
      notificationTimestamp = Date.now()
    } else {
      // Prompt for insufficient gold
      notificationMessage = 'Insufficient gold'
      notificationTimestamp = Date.now()
    }
  } else if (result === 5 || result === 6) {
    // Slider updated or hovered, redraw interface
    draw()
  }
}
