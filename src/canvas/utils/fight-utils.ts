import type { Hero } from '../constants/hero'
import type { CorrectionRule, Eft, Npc } from '../types'

import { all } from '../constants/global'
import { clone } from './base-utils'

// Range correction [0-0.05] 0
// Range correction [0.05-0.15] 10
// Range correction [0.15-0.25] 20
// Range correction [0.25-0.35] 20
// Range correction [0.35-0.45] 40
// Range correction [0.45-0.55] 50
// Range correction [0.55-0.65] 60
// Range correction [0.65-0.75] 70
// Range correction [0.75-0.85] 80
// Range correction [0.85-0.95] 90
// Range correction [0.95-1] 100
// Define range correction rules array, each element contains range start value, end value and correction value
const correctionRules: CorrectionRule[] = [
  { s: 0.0, e: 0.05, wc: 0, w: { hp: 20, tps: 0.08 }, l: { hp: 40, tps: 0.2 } },
  { s: 0.05, e: 0.15, wc: 10, w: { hp: 20, tps: 0.05 }, l: { hp: 40, tps: 0.18 } },
  { s: 0.15, e: 0.25, wc: 20, w: { hp: 20, tps: 0.05 }, l: { hp: 40, tps: 0.15 } },
  { s: 0.25, e: 0.35, wc: 20, w: { hp: 20, tps: 0.03 }, l: { hp: 40, tps: 0.12 } },
  { s: 0.35, e: 0.45, wc: 40, w: { hp: 20, tps: 0.01 }, l: { hp: 40, tps: 0.1 } },
  { s: 0.45, e: 0.55, wc: 50, w: { hp: 20, tps: 0 }, l: { hp: 40, tps: 0.1 } },
  { s: 0.55, e: 0.65, wc: 60, w: { hp: 20, tps: 0 }, l: { hp: 40, tps: 0.11 } },
  { s: 0.65, e: 0.75, wc: 70, w: { hp: 20, tps: 0 }, l: { hp: 40, tps: 0.12 } },
  { s: 0.75, e: 0.85, wc: 80, w: { hp: 20, tps: 0 }, l: { hp: 40, tps: 0.13 } },
  { s: 0.85, e: 0.9, wc: 90, w: { hp: 20, tps: 0 }, l: { hp: 40, tps: 0.15 } },
  { s: 0.9, e: 1.1, wc: 100, w: { hp: 20, tps: 0 }, l: { hp: 40, tps: 0.2 } },
]

export const calHeroWinRule = (hero: Hero, npc: Npc) => {
  let correctionRule = clone(correctionRules[0])
  if (npc) {
    const memberEfts = getAllMemberEft()

    const tpsPower = hero.tps <= 50000 ? hero.tps * 0.2 : 10000 + Math.log(hero.tps - 50000 + 1) * 50

    const heroPower = 8 *
      (hero.mHp * 1.2 +
        hero.atk * 3 +
        hero.def * 2.4 +
        memberEfts.hp * 1.2 * hero.lv +
        memberEfts.atk * 2.2 * hero.lv +
        memberEfts.def * 1.8 * hero.lv +
        tpsPower)

    const npcItemsAtk = npc.items.reduce((sum, item) => sum + (item.atk || 0), 0) || 0
    const npcItemsDef = npc.items.reduce((sum, item) => sum + (item.def || 0), 0) || 0
    const npcTpsPower =
      npc.tps <= 50000 ? npc.tps * 0.06 : 3000 + Math.log(npc.tps - 50000 + 1) * 30
    const npcPower =
      npc.h * 0.8 +
      npc.atk * 1.6 +
      npc.def * 1.2 +
      npcItemsAtk * 1.2 +
      npcItemsDef * 0.8 +
      npcTpsPower

    const winRate =
      Math.tanh(((heroPower - npcPower) * 0.7) / Math.min(heroPower, npcPower)) / 2 + 0.5

    for (const rule of correctionRules) {
      if (winRate >= rule.s && winRate < rule.e) {
        correctionRule = clone(rule)
        break
      }
    }
  }
  return correctionRule
}

export const getAllMemberEft = () => {
  let totalEft: Eft = {
    atk: 0,
    def: 0,
    hp: 0,
    gd: 0,
    exp: 0,
  }
  all.hero.mbs.forEach((item) => {
    totalEft.atk += item.eft.atk * (item.id === all.hero.mm ? 2 : 1)
    totalEft.def += item.eft.def * (item.id === all.hero.mm ? 2 : 1)
    totalEft.hp += item.eft.hp * (item.id === all.hero.mm ? 2 : 1)
    totalEft.gd += item.eft.gd * (item.id === all.hero.mm ? 2 : 1)
    totalEft.exp += item.eft.exp * (item.id === all.hero.mm ? 2 : 1)
  })

  return totalEft
}
