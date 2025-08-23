import { addItem, addMember, all, setOver } from '../constants/global'
import type { MvEv } from '../types'
import { rand, randInt } from './base-utils'

export const initMove = () => {
  randMoveEv()
  baseInfoChange()
}

const baseInfoChange = () => {
  all.hero.yr += 0.1
  all.hero.hp += 60
  if (all.hero.hp > all.hero.mHp) {
    all.hero.hp = all.hero.mHp
  }
  const limit = 13
  if (all.hero.yr >= limit) {
    setOver('L', '13 years failed')
  }
}

const randMoveEv = () => {
  all.mv.evs = []
  const toopsAndGoldLimit = 0.25
  const atkAndDefLimit = 0.16
  const itemLimit = 0.03
  const memberLimit = 0.03
  // const toopsAndGoldLimit = 0.8
  // const atkAndDefLimit = 0.8
  // const itemLimit = 0.8
  // const memberLimit = 0.8

  if (rand() < toopsAndGoldLimit) {
    const idTroopsAndGold = randInt(5, 1)
    all.mv.evs.push(getMvEv(idTroopsAndGold))
  }
  if (rand() > 1 - atkAndDefLimit) {
    const idAtkAndDef = randInt(14, 11)
    all.mv.evs.push(getMvEv(idAtkAndDef))
  }
  if (rand() < itemLimit) {
    all.mv.evs.push(getMvEv(21))
  }
  if (rand() > 1 - memberLimit) {
    all.mv.evs.push(getMvEv(31))
  }
  if (all.mv.evs.length > 0) {
    all.cs = 'V'
  }
}

const getMvEv = (t: number): MvEv => {
  let mv = {
    t,
    h: '',
    d: '',
  }
  /**
   * Type
   * 1 add troops
   * 2 rm troops
   * 3 add gold
   * 4 rm gold
   * 5 add exp
   * 11 add atk
   * 12 rm atk
   * 13 add def
   * 14 rm def
   * 21 add item < 3
   * 31 add member > 80
   */
  switch (t) {
    case 1:
      mv.h = '^_^'
      const addTroops = randInt(400, 50)
      mv.d = `Troops + ${addTroops}`
      all.hero.tps += addTroops
      break
    case 2:
      mv.h = 'v_v'
      const rmTroops = randInt(300, 50)
      mv.d = `Troops - ${rmTroops}`
      all.hero.tps -= rmTroops
      if (all.hero.tps <= 0) {
        all.hero.tps = 0
        setOver('L', 'No Troops left after move')
      }
      break
    case 3:
      mv.h = '^_^'
      const addGd = randInt(800, 50)
      mv.d = `Gold + ${addGd}`
      all.hero.g += addGd
      break
    case 4:
      mv.h = 'v_v'
      const rmGd = randInt(800, 50)
      mv.d = `Gold - ${rmGd}`
      all.hero.g -= rmGd
      break
    case 5:
      mv.h = '^_^'
      const addExp = randInt(100, 50)
      mv.d = `Exp + ${addExp}`
      all.hero.exp += addExp
      break

    case 11:
      mv.h = '^_^'
      const addAtk = randInt(10, 5)
      mv.d = `Atk + ${addAtk}`
      all.hero.atk += addAtk
      break
    case 12:
      mv.h = 'v_v'
      const rmAtk = randInt(8, 4)
      mv.d = `Atk - ${rmAtk}`
      all.hero.atk -= rmAtk
      break
    case 13:
      mv.h = '^_^'
      const addDef = randInt(10, 5)
      mv.d = `Def + ${addDef}`
      all.hero.def += addDef
      break
    case 14:
      mv.h = 'v_v'
      const rmDef = randInt(8, 4)
      mv.d = `Def - ${rmDef}`
      all.hero.def -= rmDef
      break
    case 21:
      mv.h = '^_^'
      const addItemId = rand() > 0.4 ? randInt(2, 0) : randInt(0, 2) + 30
      const thisItem = all.its.find((it) => it.id === addItemId)
      if (!thisItem) {
        break
      }
      addItem(thisItem)
      mv.d = `Got item: ${thisItem.name}`
      break
    case 31:
      mv.h = '^_^'
      const lowNpcs = all.nps.filter(
        (npc) => npc.id % 100 > 80 && Math.floor((npc.id - 100000) / 1000) < 3
      )
      const randInLowNpcIndex = randInt(lowNpcs.length - 1, 0)
      const thisMember = lowNpcs[randInLowNpcIndex]
      if (!thisMember) {
        break
      }
      addMember(thisMember)
      mv.d = `Got member: ${thisMember.n}`
      break

    default:
      mv.t = 0
      break
  }
  return mv
}
