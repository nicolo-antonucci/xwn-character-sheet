import { FocusType } from './Focus';
import { Shock } from './ruleTypes';

export type ClassName =
  | 'Expert'
  | 'Warrior'
  | 'Mage'
  | 'Partial Expert/Partial Warrior'
  | 'Partial Expert/Partial Mage'
  | 'Mage Expert/Partial Warrior'
  | 'Mage: Dual Tradition';

export const ClassName = {
  EXPERT: 'Expert' as ClassName,
  WARRIOR: 'Warrior' as ClassName,
  MAGE: 'Mage' as ClassName,
  ADVENTURER_EXPERT_WARRIOR: 'Partial Expert/Partial Warrior' as ClassName,
  ADVENTURER_EXPERT_MAGE: 'Partial Expert/Partial Mage' as ClassName,
  ADVENTURER_MAGE_WARRIOR: 'Partial Mage/Partial Warrior' as ClassName,
  MAGE_DUAL_TRADITION: 'Mage: Dual Tradition' as ClassName,
};

export type ArcaneTradition = 'High Mage' | 'Elementalist' | 'Healer' | 'Necromancer' | 'Vowed';

export const ArcaneTradition = {
  HIGH_MAGE: 'High Mage' as ArcaneTradition,
  ELEMENTALIST: 'Elementalist' as ArcaneTradition,
  HEALER: 'Healer' as ArcaneTradition,
  NECROMANCER: 'Necromancer' as ArcaneTradition,
  VOWED: 'Vowed' as ArcaneTradition,
};

export interface MagicLevelPerks {
  maxLevel?: number;
  spellsCast?: number;
  spellsPrepared?: number;
  artsGained?: number;
  punchHitBonus?: 0 | 1 | 2 | 3 | 4 | 5;
  punchDamage?: '1d6' | '1d8' | '1d10' | '1d10+1' | '1d10+2' | '1d10+3';
  punchShock?: Shock;
}

export interface MagicTable {
  1: MagicLevelPerks;
  2: MagicLevelPerks;
  3: MagicLevelPerks;
  4: MagicLevelPerks;
  5: MagicLevelPerks;
  6: MagicLevelPerks;
  7: MagicLevelPerks;
  8: MagicLevelPerks;
  9: MagicLevelPerks;
  10: MagicLevelPerks;
}

export interface ArcaneTraditionTable {
  id: number;
  name?: ArcaneTradition;
  description?: string;
  fullTable?: MagicTable;
  partialTable?: MagicTable;
}

export interface CharacterClass {
  id: number;
  name?: string;
  hitDiceModifier?: number;
  bab?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
  };
  levelOneFoci?: FocusType[];
  perks?: {
    name: string;
    description: string[];
  }[];
  arcaneTraditionTable?: ArcaneTraditionTable;
}

export const DUAL_TRADITION_TABLE: MagicTable = {
  1: {
    maxLevel: 1,
    spellsCast: 1,
    spellsPrepared: 3,
  },
  2: {
    maxLevel: 1,
    spellsCast: 1,
    spellsPrepared: 4,
  },
  3: {
    maxLevel: 1,
    spellsCast: 2,
    spellsPrepared: 5,
  },
  4: {
    maxLevel: 2,
    spellsCast: 2,
    spellsPrepared: 6,
  },
  5: {
    maxLevel: 2,
    spellsCast: 2,
    spellsPrepared: 8,
  },
  6: {
    maxLevel: 2,
    spellsCast: 3,
    spellsPrepared: 9,
  },
  7: {
    maxLevel: 3,
    spellsCast: 3,
    spellsPrepared: 10,
  },
  8: {
    maxLevel: 3,
    spellsCast: 4,
    spellsPrepared: 12,
  },
  9: {
    maxLevel: 3,
    spellsCast: 4,
    spellsPrepared: 13,
  },
  10: {
    maxLevel: 4,
    spellsCast: 5,
    spellsPrepared: 15,
  },
};
