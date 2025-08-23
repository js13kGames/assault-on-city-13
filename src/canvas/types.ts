import type { Hero } from './constants/hero'

export interface Button {
  id: string
  x: number
  y: number
  width: number
  height: number
  label: string
  color: string
}

export interface ScrollButton extends Button {
  isScrollUp: boolean
}

export interface ScrollArea {
  x: number
  y: number
  width: number
  height: number
  scrollOffset: number
  maxScroll: number
  buttons: Button[]
  scrollUpButton: ScrollButton
  scrollDownButton: ScrollButton
}

export interface City {
  x: number
  y: number
  w: number
  h: number
  id: number
  nIds: number[]
  isA: boolean
  go: number[]
}

/**
 * 'N': normal npc
 * 'B': boss npc
 * 'S': shop npc
 */
export type NpcType = 'N' | 'B' | 'S'

/**
 * 'M': map
 * 'I': items
 * 'T': team
 * 'N': npc detail
 * 'O': game over
 * 'H': home
 * 'V': move
 * 'TP': troops
 * 'S': start
 * 'C': Confirm new game
 */
export type ScreenType = 'M' | 'I' | 'T' | 'N' | 'O' | 'H' | 'V' | 'TP' | 'S' | 'C'

export interface NpcItem {
  id: number
  name: string
  count: number
  atk: number
  def: number
}

export interface Eft {
  atk: number
  def: number
  hp: number
  gd: number
  exp: number
}

export interface Npc {
  id: number
  n: string
  /**
   * 'N': normal npc
   * 'B': boss npc
   * 'S': shop npc
   */
  t: NpcType
  /** heart */
  ht: number
  lv: number
  h: number
  tps: number
  exp: number
  atk: number
  def: number
  g: number
  items: NpcItem[]
  /** need items */
  nItem: NpcItem
  /** need gold */
  nGd: number
  eft: Eft
}

export interface Item {
  id: number
  name: string
  /** long name */
  ln: string
  /** 1: weapon 2: armor 3: item */
  type: number
  atk?: number
  def?: number
  gd: number
  hp?: number
  /** count, less than 14 */
  ct: number
}

export interface Ntd {
  p: 'N' | 'T' | 'T2' | 'T3' | 'T4' | 'F' | 'F2' | 'F3' | 'F4'
  d: string
  f: string
  tt: {
    t1: string
    t2: string
    t3: string
    t4: string
    t5: string
    t6: string
  }
  ft: {
    t1: string
    t2: string
    t3: string
    t4: string
    t5: string
    t6: string
  }
}

export interface MvEv {
  /**
   * Type
   * 1 add troops
   * 2 rm troops
   * 3 add gold
   * 4 rm gold
   * 11 add atk
   * 12 rm atk
   * 13 add def
   * 14 rm def
   * 21 add item < 3
   * 31 add member > 80
   */
  t: number
  /** head title */
  h: string
  /** head desc */
  d: string
}

export interface Mv {
  evs: MvEv[]
}

export interface Otd {
  /**
   * W: win L: lose
   */
  t: 'W' | 'L'
  r: string
  h: Hero
  acs: number[]
  acw: number[]
}

export interface All {
  nt: Ntd
  ot: Otd
  /**
   * 'M': map
   * 'I': items
   * 'T': team
   * 'N': npc detail
   * 'O': game over
   * 'H': home
   * 'V': move
   * 'TP': troops
   * 'S': start
   * 'C': Confirm new game
 */
  cs: ScreenType
  /** can continue */
  c: boolean
  /** canvas scale */
  s: number
  /** move info */
  mv: Mv
  /** base width of the canvas */
  baseW: number
  /** hovered city id */
  hCId: number
  /** selected city id */
  sCId: number
  /** hovered npc name */
  hNName: string
  /** hovered button type (1 close 2 talk 3 ft  null) */
  hNBtn: number
  hTBtn: number
  hTPBtn: number
  hHBtn: number
  hOBtn: number
  hVBtn: number
  hCBtn: number
  hSBtn: number
  /** current city npcs */
  cNpcs: Npc[]
  /** current npc id */
  cNId: number
  /** all cities */
  cts: City[]
  /** all npcs */
  nps: Npc[]
  /** all items */
  its: Item[]
  /** current item id */
  cIId: number
  /** Bag item text */
  iT: string
  /** all active city ids */
  acs: number[]
  /** all city boss is win city ids */
  acw: number[]
  /** team */
  /** current team member id */
  cTId: number
  hero: Hero
  /** is in shop */
  inS?: boolean
}

export interface CorrectionRuleResult {
  hp: number
  tps: number
}

export interface CorrectionRule {
  /** start */
  s: number
  /** end */
  e: number
  wc: number
  w: CorrectionRuleResult
  l: CorrectionRuleResult
}
