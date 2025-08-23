import {
  addExp,
  addItem,
  all,
  getCurrentNpc,
  ntd,
  saveGame,
  setOver,
  speed,
} from '../constants/global'
import { clone, rand, rand100, randInt } from '../utils/base-utils'
import { calHeroWinRule } from '../utils/fight-utils'

export const npcFight = (draw: () => void) => {
  const npc = getCurrentNpc()
  all.nt.p = 'F'
  draw()
  setTimeout(() => {
    all.nt.f = '#fff'
    draw()
    setTimeout(() => {
      all.nt.f = '#aaa'
      draw()
      setTimeout(() => {
        const rule = calHeroWinRule(all.hero, all.nps.find((n) => n.id === all.cNId)!)
        let isWin = false
        if (rand100() < rule.wc) {
          // Win
          // gold + x
          all.hero.g += npc.g
          all.nt.ft.t4 = npc.g + ''
          // exp + x
          const isUp = addExp(npc.exp)
          all.nt.ft.t5 = isUp ? `${npc.exp}, Lv ➔ ${all.hero.lv}` : npc.exp + ''

          all.nt.ft.t6 = ''
          const gotItems = npc.items.filter(
            (item) =>
              (item.id < 30 && rand100() < 40 - item.id) ||
              (item.id >= 30 && rand100() < 70 - item.id)
          )
          if (gotItems.length > 0) {
            gotItems.forEach((item) => {
              all.nt.ft.t6 += all.nt.ft.t6 === '' ? `+${item.name}` : `, +${item.name}`
              addItem(all.its.find((it) => it.id === item.id)!)
            })
          }
          if (npc.t === 'B' && !all.acw.includes(all.sCId)) {
            all.acw.push(all.sCId)
            const currentCityCanGo = all.cts.find((c) => c.id === all.sCId)!.go
            currentCityCanGo.forEach((id) => {
              if (!all.acs.includes(id)) {
                all.cts.find((c) => c.id === id)!.isA = true
                all.acs.push(id)
              }
            })
            // all npc lv+1
            all.nps.forEach((n) => {
              n.lv++
              // all npc's param + 7%

              n.g = Math.floor(n.g * 1.07)
              n.exp = Math.floor(n.exp * 1.07)
              n.tps = Math.floor(n.tps * 1.07)
              n.h = Math.floor(n.h * 1.07)
              n.atk = Math.floor(n.atk * 1.07)
              n.def = Math.floor(n.def * 1.07)
            })
          }

          isWin = true
        } else {
          // Lose
        }
        // ❤ - x
        const minusHeart = randInt(10, 5)
        npc.ht -= minusHeart
        all.nt.ft.t1 = minusHeart + ''
        const wl = isWin ? rule.w : rule.l
        // hp - x
        all.hero.hp -= wl.hp
        all.nt.ft.t2 = wl.hp + ''
        // toops - x
        const minusTps = Math.floor(wl.tps * npc.tps / 10)
        all.hero.tps -= isWin ? Math.floor(minusTps / 3) : minusTps
        all.nt.ft.t3 = minusTps + ''

        all.nt.p = isWin ? 'F2' : 'F3'

        if (isWin && npc.n === '13-13') {
          setOver('W', 'Win 13-13')
        } else if (all.hero.tps <= 0) {
          all.hero.tps = 0
          all.nt = clone(ntd)
          setOver('L', 'No Troops left after fight')
        } else if (all.hero.hp <= 0) {
          all.hero.hp = 0
          all.nt = clone(ntd)
          setOver('L', 'No HP left after fight')
        }
        if (all.c) {
          saveGame()
        }
        draw()
      }, speed)
    }, speed)
  }, speed)
}
