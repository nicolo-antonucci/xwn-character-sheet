import { generateId } from '../commons/Utils';
import { BGBenefit, Background, BenefitPickType, WWNBACKGROUND } from './backgrounds';
import { RULESET } from './properties';
import { SWNSKILLS, Skills, WWNSKILLS } from './skills';

export type SCORE = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export const SCORE = {
  STR: 'str' as SCORE,
  DEX: 'dex' as SCORE,
  CON: 'con' as SCORE,
  INT: 'int' as SCORE,
  WIS: 'wis' as SCORE,
  CHA: 'cha' as SCORE,
};

export interface AbilityScores {
  str: number | null;
  dex: number | null;
  con: number | null;
  int: number | null;
  wis: number | null;
  cha: number | null;
}

export interface Benefit {
  description: string;
  perks: unknown;
}

export interface Focus {
  description: string;
  benefits: {
    1: Benefit;
    2: Benefit;
  };
  level: 1 | 2;
}

export class Character {
  id: string;
  ruleset: RULESET | null = null;
  abilityScores: AbilityScores;
  characterBackground: {
    background: Background | null;
    benefitPickType: BenefitPickType | null;
    bgBenefits: BGBenefit[] | null;
  };
  skills: Skills | null;
  foci: Focus[];

  constructor() {
    this.id = generateId();
    this.abilityScores = {
      cha: null,
      con: null,
      dex: null,
      int: null,
      str: null,
      wis: null,
    };
    this.skills = null;
    this.foci = [];
    this.characterBackground = {
      background: null,
      benefitPickType: null,
      bgBenefits: null,
    };
  }
}
