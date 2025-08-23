import { all, ntd, saveGame, setOver, speed } from '../constants/global'
import { randInt, clone, checkNpcNeed } from '../utils/base-utils'

export const npcTalk = (draw: () => void) => {
  all.nt.p = 'T'
  draw()
  setTimeout(() => {
    all.nt.d = '..'
    draw()
    setTimeout(() => {
      all.nt.d = '...'
      draw()
      setTimeout(() => {
        const currentNpc = all.nps.find((n) => n.id === all.cNId)
        if (currentNpc) {
          const { haveGold, haveItem } = checkNpcNeed(all, currentNpc)
          if (currentNpc.ht >= 100 && haveGold && haveItem) {
            all.nt.tt.t1 = `${currentNpc.n}: Can I join your team?`
            const t5Text = `Need gold: ${currentNpc.nGd} - ✔`
            const t6Text = `Need item: ${currentNpc.nItem.name} - ✔`
            all.nt.tt.t5 = t5Text
            all.nt.tt.t6 = t6Text
            all.nt.p = 'T3'
          } else {
            all.nt.tt.t1 = currentNpc.ht + ''
            const baseAdd = Math.floor((currentNpc.id % 1000) / 4)
            const add = 5 + randInt(Math.floor(baseAdd * 1.6), Math.floor(baseAdd / 1.3))
            currentNpc.ht += add
            if (currentNpc.ht > 100) {
              currentNpc.ht = 100
            }
            all.nt.tt.t2 = currentNpc.ht + ''
            all.nt.tt.t3 = all.hero.hp + ''
            const minusHp = 10
            all.hero.hp -= minusHp
            all.nt.tt.t4 = all.hero.hp + ''

            if (currentNpc.ht >= 100) {
              const t5Text = `Need gold: ${currentNpc.nGd} - ${haveGold ? '✔' : '✖'}`
              const t6Text = `Need item: ${currentNpc.nItem.name} - ${haveItem ? '✔' : '✖'}`
              all.nt.tt.t5 = t5Text
              all.nt.tt.t6 = t6Text
            }

            all.nt.p = 'T2'
            if (all.hero.hp <= 0) {
              all.hero.hp = 0
              all.nt = clone(ntd)
              setOver('L', 'No HP left after conversation')
            }
          }
        } else {
          all.nt.p = 'T2'
        }
        if (all.c) {
          saveGame()
        }
        draw()
      }, speed)
    }, speed)
  }, speed)
}
