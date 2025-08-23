import type { All, Item, Npc, Ntd, Otd } from '../types'
import {
  clone,
  generateEft,
  getNpcItemFromItem,
  initCityNpcs,
  rand,
  randInt,
  selectRandomItems,
} from '../utils/base-utils'
import { citiesDefault, itemsDefault } from './default-data'
import { heroDefault } from './hero'

export const ntd: Ntd = {
  /** current npc inner page N: normal T: talk F: Fight */
  p: 'N',
  d: '.',
  f: '#aaa',
  tt: {
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    t5: '',
    t6: '',
  },
  ft: {
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    t5: '',
    t6: '',
  },
}
export const otd: Otd = {
  /**
   * W: win L: lose
   */
  t: 'W',
  r: 'Game over',
  h: clone(heroDefault),
  acs: [1],
  acw: [0],
}

const allD: All = {
  cs: 'C',
  c: false,
  nt: clone(ntd),
  ot: clone(otd),
  s: 1,
  mv: {
    evs: [],
  },
  baseW: 400,
  hCId: -1,
  sCId: 1,
  hNName: '',
  hNBtn: -1,
  hTBtn: -1,
  hTPBtn: -1,
  hHBtn: -1,
  hVBtn: -1,
  hOBtn: -1,
  hCBtn: -1,
  hSBtn: -1,
  cNpcs: [],
  cNId: -1,
  cts: clone(citiesDefault),
  nps: [],
  its: clone(itemsDefault),
  iT: '',
  cIId: -1,
  cTId: -1,
  acs: [1, 2],
  // acs: [1, 2, 3, 4, 5, 6,7,8,9,10, 11,12, 13], // for test
  acw: [],
  hero: clone(heroDefault),
}

export let all = clone(allD)

export const speed = 400

export const getCurrentNpc = () => all.nps.find((n) => n.id === all.cNId) || all.nps[0]

export const initAllCityNpcs = (isFirst = false) => {
  if (isFirst) {
    all.nps = []
    all.cts.sort((a, b) => a.id - b.id)

    all.cts.forEach((city) => {
      city.nIds = []
      const n = [7, 13]
      while (n.length < 12) {
        const random = Math.floor(Math.random() * 80) + 20
        if (!n.includes(random)) {
          n.push(random)
        }
      }
      n.sort((a, b) => a - b)
      let nextCityId = city.id + 1
      if (nextCityId > 13) {
        nextCityId = 13
      }
      n.forEach((id) => {
        const nextCityItems = all.its.filter(
          (item) =>
            (item.type === 1 && item.id <= nextCityId) ||
            (item.type === 2 && item.id <= nextCityId + 30)
        )

        const type1Items = nextCityItems.filter((item) => item.type === 1)
        const type2Items = nextCityItems.filter((item) => item.type === 2)

        const type1Count = randInt(2, 1)
        const selectedType1Items = selectRandomItems(type1Items, type1Count)

        let type2Count = randInt(2, 0)
        if (type1Count === 2 && type2Count === 2) {
          type2Count = randInt(1, 0)
        }
        const selectedType2Items = selectRandomItems(type2Items, type2Count)

        const haveItems = [...selectedType1Items, ...selectedType2Items]
        const needItem = selectRandomItems(nextCityItems, 1)[0]

        // console.log(city.id, id);
        const eft = generateEft(city.id, id)
        // console.log(eft);

        let bs = 1 + (city.id * (100 - id)) / 10 + (city.id - 1) * 50
        if (id === 13) {
          bs *= 1.5
        }
        // console.log(`${city.id}-${id}`, bs)

        let tn: Npc = {
          id: 100000 + city.id * 1000 + id,
          n: `${city.id}-${id}`,
          t: 'N',
          lv: 0,
          h: Math.floor((5 * rand() + 10) * 10 * bs),
          tps: Math.floor((5 * rand() + 10) * 50 * bs),
          ht: randInt(10, 0),
          exp: Math.floor(2 * bs * rand() + 5 * bs),
          g: Math.floor(4 * bs * rand() + 8 * bs) * 10,
          atk: Math.floor(3 * bs * rand() + 6 * bs),
          def: Math.floor(2 * bs * rand() + 4 * bs),
          items: haveItems.map((item) => getNpcItemFromItem(item)),
          nItem: getNpcItemFromItem(needItem),
          nGd: Math.floor(4 * bs * rand() + 8 * bs) * 10 + 1000,
          eft: eft,
        }

        if (id === 13) {
          tn.t = 'B'
        } else if (id === 7) {
          tn.t = 'S'
        }
        city.nIds.push(tn.id)
        all.nps.push(tn)
      })
    })
  }

  all.cNpcs = initCityNpcs(all.cts[0], all.nps)
}

export const addExp = (exp: number) => {
  let isUp = false
  all.hero.exp += exp
  // 循环检查是否能升多级
  while (all.hero.exp >= all.hero.mExp) {
    all.hero.lv += 1
    all.hero.exp -= all.hero.mExp
    all.hero.mExp = all.hero.lv * 1000
    all.hero.mHp += 10
    all.hero.hp = all.hero.mHp
    all.hero.atk += all.hero.lv * 20
    all.hero.def += all.hero.lv * 10
    isUp = true
  }
  return isUp
}

export const addItem = (item: Item, count = 1) => {
  const inItem = all.its.find((it) => it.id === item.id)
  if (!inItem) {
    return
  } else {
    inItem.ct += count
  }
}

export const rmItem = (item: Item, count = 1) => {
  const inItem = all.its.find((it) => it.id === item.id)
  if (!inItem) {
    return
  } else {
    inItem.ct -= count
    if (inItem.ct < 0) {
      inItem.ct = 0
    }
  }
}

export const addMember = (npc: Npc) => {
  if (all.hero.mbs.findIndex((mb) => mb.id === npc.id) > -1) {
    return
  }
  all.hero.mbs.push({
    id: npc.id,
    name: npc.n,
    lv: npc.lv,
    eft: npc.eft,
  })
  saveGame()
}

export const rmMember = (npc: Npc) => {
  const index = all.hero.mbs.findIndex((mb) => mb.id === npc.id)
  if (index > -1) {
    all.hero.mbs.splice(index, 1)
  }
  saveGame()
}

export const setOver = (t: 'W' | 'L', r: string) => {
  all.ot.t = t
  all.ot.r = r
  all.ot.h = clone(all.hero)
  all.ot.acs = all.acs
  all.ot.acw = all.acw
  all.cs = 'O'
  saveGame(false)
}

export const resetAllData = () => {
  all.nt = clone(ntd)
  all.ot = clone(otd)
  all.hero = clone(heroDefault)
  all.cts = clone(citiesDefault)
  all.its = clone(itemsDefault)
  all.acs = [1, 2]
  all.acw = [0]
  all.sCId = 1
  all.hCId = -1
  all.cIId = -1
  all.cTId = -1

  initAllCityNpcs(true)
}

export const newGame = () => {
  resetAllData()
  all.cs = 'S'
}
const sKey = 'js13k-numwar-bobgame'
const cv = 1
export const saveGame = (canContinue = true) => {
  all.c = canContinue
  const data = {
    v: cv,
    c: canContinue,
    a: clone(all),
  }
  localStorage.setItem(sKey, JSON.stringify(data))
}

export const load = () => {
  const data = localStorage.getItem(sKey)
  if (data) {
    const gameData = JSON.parse(data)
    if (gameData?.v && gameData?.v === cv) {
      all = clone(gameData.a)
      all.c = gameData.c
      all.cs = 'H'
      all.nt = clone(ntd)
      all.ot = clone(otd)
    }
  }
}
