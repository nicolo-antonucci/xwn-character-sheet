import { generateId } from '../commons/Utils';
import { Focus } from './focus';
import { BGBenefit, BGBenefitPickType, Background } from './backgrounds';
import { CharacterClass } from './characterClass';
import { RULESET } from './properties';
import { Skills } from './skills';

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

export class Character {
  id: string;
  ruleset: RULESET = RULESET.WWN;
  abilityScores: AbilityScores;
  characterBackground: {
    background: Background | null;
    benefitPickType: BGBenefitPickType | null;
    bgBenefits: BGBenefit[] | null;
  };
  skills: Skills | null;
  foci: Focus[];
  characterClass: CharacterClass | null;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 1;
  flags: string[] = [];

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
    this.characterClass = null;
  }
}
