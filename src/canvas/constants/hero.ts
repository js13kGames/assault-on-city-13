import type { Eft } from '../types'

export interface Hero {
  id: number
  /** name */
  n: string
  lv: number
  yr: number
  exp: number
  mExp: number
  hp: number
  mHp: number
  atk: number
  def: number
  g: number
  tps: number
  /** Weapon id */
  wp: number
  /** Armor id */
  ar: number
  // items: HeroItem[]
  /** hero team members */
  mbs: HeroMember[]
  /** main member id */
  mm: number
}

export interface HeroMember {
  id: number
  name: string
  lv: number
  eft: Eft
}

export interface HeroItem {
  id: number
  name: string
  count: number
}

export const heroDefault: Hero = {
  id: 1,
  n: 'Hero(0-0)',
  lv: 1,
  yr: 0,
  exp: 0,
  mExp: 100,
  hp: 100,
  mHp: 100,
  tps: 800,
  atk: 40,
  def: 12,
  g: 2000,
  wp: 0,
  ar: 30,
  mbs: [],
  mm: 0,
}
