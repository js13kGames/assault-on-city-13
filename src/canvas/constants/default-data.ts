import type { City, Item, Npc } from '../types'

export const citiesDefault: City[] = [
  { x: 10, y: 220, w: 50, h: 60, id: 1, nIds: [], isA: true, go: [2, 3] },
  { x: 70, y: 220, w: 50, h: 60, id: 2, nIds: [], isA: true, go: [1, 5, 6] },
  { x: 130, y: 220, w: 50, h: 60, id: 6, nIds: [], isA: false, go: [2, 7, 11] },
  { x: 190, y: 220, w: 50, h: 60, id: 7, nIds: [], isA: false, go: [6, 12] },

  { x: 10, y: 10, w: 50, h: 60, id: 8, nIds: [], isA: false, go: [4, 9] },
  { x: 70, y: 10, w: 50, h: 60, id: 9, nIds: [], isA: false, go: [8, 10, 13] },
  { x: 130, y: 10, w: 110, h: 130, id: 13, nIds: [], isA: false, go: [9, 10, 11, 12] },

  { x: 10, y: 80, w: 50, h: 60, id: 4, nIds: [], isA: false, go: [3, 8, 10] },
  { x: 70, y: 80, w: 50, h: 60, id: 10, nIds: [], isA: false, go: [4, 5, 9, 13] },

  { x: 10, y: 150, w: 50, h: 60, id: 3, nIds: [], isA: true, go: [1, 4, 5] },
  { x: 70, y: 150, w: 50, h: 60, id: 5, nIds: [], isA: false, go: [2, 3, 10, 11] },
  { x: 130, y: 150, w: 50, h: 60, id: 11, nIds: [], isA: false, go: [5, 6, 12, 13] },
  { x: 190, y: 150, w: 50, h: 60, id: 12, nIds: [], isA: false, go: [7, 11, 13] },
]

export const npcs: Npc[] = []

export const itemsDefault: Item[] = [
  { id: 0, name: 'S0', ln: 'Ashsteel', type: 1, atk: 20, gd: 50, ct: 1 },
  { id: 1, name: 'S1', ln: 'Verdigris', type: 1, atk: 50, gd: 100, ct: 0 },
  { id: 2, name: 'S2', ln: 'Mossedge', type: 1, atk: 120, gd: 300, ct: 0 },
  { id: 3, name: 'S3', ln: 'Groveblade', type: 1, atk: 200, gd: 700, ct: 0 },
  { id: 4, name: 'S4', ln: 'Lakelure', type: 1, atk: 300, gd: 1300, ct: 0 },
  { id: 5, name: 'S5', ln: 'Seafoam', type: 1, atk: 400, gd: 2100, ct: 0 },
  { id: 6, name: 'S6', ln: 'Mistblade', type: 1, atk: 500, gd: 3400, ct: 0 },
  { id: 7, name: 'S7', ln: 'Abyssal', type: 1, atk: 600, gd: 5500, ct: 0 },
  { id: 8, name: 'S8', ln: 'Duskprism', type: 1, atk: 900, gd: 8900, ct: 0 },
  { id: 9, name: 'S9', ln: 'Magma Ash', type: 1, atk: 1200, gd: 14400, ct: 0 },
  { id: 10, name: 'S10', ln: 'Sunglow', type: 1, atk: 1600, gd: 23300, ct: 0 },
  { id: 11, name: 'S11', ln: 'Embercore', type: 1, atk: 2000, gd: 37700, ct: 0 },
  { id: 12, name: 'S12', ln: 'Crimson Pyre', type: 1, atk: 3000, gd: 61000, ct: 0 },
  { id: 13, name: 'S13', ln: 'Bloodmoon', type: 1, atk: 4500, gd: 100000, ct: 0 },

  { id: 30, name: 'A0', ln: 'Hideguard', type: 2, def: 2, gd: 50, ct: 1 },
  { id: 31, name: 'A1', ln: 'Bronzeweave', type: 2, def: 5, gd: 100, ct: 0 },
  { id: 32, name: 'A2', ln: 'Mossward', type: 2, def: 10, gd: 300, ct: 0 },
  { id: 33, name: 'A3', ln: 'Scalehide', type: 2, def: 20, gd: 700, ct: 0 },
  { id: 34, name: 'A4', ln: 'Chainfort', type: 2, def: 40, gd: 1300, ct: 0 },
  { id: 35, name: 'A5', ln: 'Ironbark', type: 2, def: 60, gd: 2100, ct: 0 },
  { id: 36, name: 'A6', ln: 'Frostplate', type: 2, def: 90, gd: 3400, ct: 0 },
  { id: 37, name: 'A7', ln: 'Embercoat', type: 2, def: 120, gd: 5500, ct: 0 },
  { id: 38, name: 'A8', ln: 'Soulbark', type: 2, def: 170, gd: 8900, ct: 0 },
  { id: 39, name: 'A9', ln: 'Abyssmail', type: 2, def: 250, gd: 14400, ct: 0 },
  { id: 40, name: 'A10', ln: 'Sunforge', type: 2, def: 350, gd: 23300, ct: 0 },
  { id: 41, name: 'A11', ln: 'Dragonhide', type: 2, def: 500, gd: 37700, ct: 0 },
  { id: 42, name: 'A12', ln: 'Phoenixmail', type: 2, def: 700, gd: 61000, ct: 0 },
  { id: 43, name: 'A13', ln: 'Voidplate', type: 2, def: 1000, gd: 100000, ct: 0 },
]

// Dull Scrap Iron #5A5A5A - Basic gray tone, valueless
// Old Cast Iron #6E7C7C - Gray with blue tint, slight metallic feel
// Mossy Green #5C7E6D - Gray-green transition, initial natural vitality
// Forest Moss #4A8C6D - Soft green tone, low-level natural equipment
// Lake Glaze #4A9A8C - Green-blue blend, clear water feel
// Shallow Sea Blue #4A9AA8 - Blue-green transition, start of cool tones
// Misty Blue Steel #5A8CA8 - Gray-blue matte, mid-level equipment start
// Deep Sea Cobalt #4A6C9A - Calm blue tone, reliable quality
// Twilight Amethyst #6C5A9A - Blue-purple transition, increased rarity
// Lava Ember #9A6C5A - Orange-brown base, initial energy appearance
// Sunset Warm Orange #D19A5A - Soft orange-yellow, warm and eye-catching
// Blazing Core #D17D5A - Orange-red blend, high-level equipment marker
// Crimson Flame #C75A5A - Low saturation red, danger warning
// Blood Moon End #A83C3C - Dark red convergence, peak quality symbol
export const itemColors = [
  '#888888',
  '#6E7C7C',
  '#5C7E6D',
  '#4A8C6D',
  '#4A9A8C',
  '#4A9AA8',
  '#5A8CA8',
  '#4A6C9A',
  '#6C5A9A',
  '#9A6C5A',
  '#D19A5A',
  '#D17D5A',
  '#C75A5A',
  '#A83C3C',
]

export const eftRanges = {
  atk: [5, 100],
  def: [2, 50],
  hp: [10, 100],
  gd: [0.01, 0.2],
  exp: [0.01, 0.2],
}
