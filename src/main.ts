import './style.css'
import { setupCanvas } from './canvas'
import { all } from './canvas/constants/global.ts'

const canvas = setupCanvas()

const resizeCanvas = () => {
  const canvasContainer = document.querySelector<HTMLDivElement>('#can-con')
  const appDom = document.querySelector<HTMLDivElement>('#app')
  if (!canvasContainer || !appDom) return
  const size = Math.min(appDom.offsetWidth, appDom.offsetHeight)
  canvasContainer.style.width = `${size}px`
  canvasContainer.style.height = `${size}px`

  all.s = size / all.baseW
  if (canvas) {
    canvas.resize()
  }
}
const initGame = () => {
  resizeCanvas()
}

initGame()

window.addEventListener('resize', () => {
  resizeCanvas()
})
