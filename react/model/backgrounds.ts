import { SCORE } from './character';
import { SWNSKILLS, WWNSKILLS } from './skills';

export type WWNBACKGROUND =
  | 'Artisan'
  | 'Barbarian'
  | 'Carter'
  | 'Courtesan'
  | 'Criminal'
  | 'Hunter'
  | 'Laborer'
  | 'Merchant'
  | 'Noble'
  | 'Nomad'
  | 'Peasant'
  | 'Performer'
  | 'Physician'
  | 'Priest'
  | 'Sailor'
  | 'Scholar'
  | 'Slave'
  | 'Soldier'
  | 'Thug'
  | 'Wanderer';

export const WWNBACKGROUND = {
  ARTISAN: 'Artisan' as WWNBACKGROUND,
  BARBARIAN: 'Barbarian' as WWNBACKGROUND,
  CARTER: 'Carter' as WWNBACKGROUND,
  COURTESAN: 'Courtesan' as WWNBACKGROUND,
  CRIMINAL: 'Criminal' as WWNBACKGROUND,
  HUNTER: 'Hunter' as WWNBACKGROUND,
  LABORER: 'Laborer' as WWNBACKGROUND,
  MERCHANT: 'Merchant' as WWNBACKGROUND,
  NOBLE: 'Noble' as WWNBACKGROUND,
  NOMAD: 'Nomad' as WWNBACKGROUND,
  PEASANT: 'Peasant' as WWNBACKGROUND,
  PERFORMER: 'Performer' as WWNBACKGROUND,
  PHYSICIAN: 'Physician' as WWNBACKGROUND,
  PRIEST: 'Priest' as WWNBACKGROUND,
  SAILOR: 'Sailor' as WWNBACKGROUND,
  SCHOLAR: 'Scholar' as WWNBACKGROUND,
  SLAVE: 'Slave' as WWNBACKGROUND,
  SOLDIER: 'Soldier' as WWNBACKGROUND,
  THUG: 'Thug' as WWNBACKGROUND,
  WANDERER: 'Wanderer' as WWNBACKGROUND,
};

export type BenefitPickType = 'rolled' | 'chosen';

export const BenefitPickType = {
  CHOSEN: 'chosen' as BenefitPickType,
  ROLLED: 'rolled' as BenefitPickType,
};

export type BGBenefitType = 'growth' | 'learning' | 'quick';

export const BGBenefitType = {
  GROWTH: 'growth' as BenefitPickType,
  LEARNING: 'learning' as BenefitPickType,
  QUICK: 'quick' as BenefitPickType,
};

export type BGBenefitValue = 'Any Skill' | 'Any Combat' | '+1 Any Stat' | '+2 Physical' | '+2 Mental';

export const BGBenefitValue = {
  ANY_SKILL: 'Any Skill' as BGBenefitValue,
  ANY_COMBAT: 'Any Combat' as BGBenefitValue,
  ANY_SCORE: '+1 Any Stat' as BGBenefitValue,
  PHYSICAL: '+2 Physical' as BGBenefitValue,
  MENTAL: '+2 Mental' as BGBenefitValue,
};

export interface BGBenefit {
  type: BGBenefitType;
  value: SWNSKILLS | WWNSKILLS | BGBenefitValue;
  secondaryValue?: SWNSKILLS | WWNSKILLS | SCORE;
}

export interface Background {
  name: WWNBACKGROUND | null;
  description: string | null;
  freeSkill: SWNSKILLS | WWNSKILLS;
  quickPicks: SWNSKILLS[] | WWNSKILLS[];
  growthChoices: (SWNSKILLS | WWNSKILLS | BGBenefitValue)[];
  learningChoices: (SWNSKILLS | WWNSKILLS | BGBenefitValue)[];
}
