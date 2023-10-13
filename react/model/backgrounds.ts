import { SCORE } from './character';
import { SKILL_CHOICE, SWNSKILLS, WWNSKILLS } from './skills';

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

export type BGBenefitPickType = 'free' | 'quick' | 'rolled' | 'chosen';

export const BGBenefitPickType = {
  FREE: 'free' as BGBenefitPickType,
  QUICK: 'quick' as BGBenefitPickType,
  CHOSEN: 'chosen' as BGBenefitPickType,
  ROLLED: 'rolled' as BGBenefitPickType,
};

export type BGBenefitType = 'growth' | 'learning' | 'quick';

export const BGBenefitType = {
  GROWTH: 'growth' as BGBenefitType,
  LEARNING: 'learning' as BGBenefitType,
  QUICK: 'quick' as BGBenefitType,
};

export type BGBenefitValue = 'Any Skill' | 'Any Combat' | 'Any Non-Combat' | '+1 Any Stat' | '+2 Physical' | '+2 Mental';

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
  id: number;
  name?: WWNBACKGROUND | null;
  description?: string | null;
  freeSkill?: SKILL_CHOICE | SWNSKILLS | WWNSKILLS;
  quickPicks?: (SKILL_CHOICE | SWNSKILLS | WWNSKILLS)[];
  growthChoices?: (SWNSKILLS | WWNSKILLS | BGBenefitValue)[];
  learningChoices?: (SWNSKILLS | WWNSKILLS | BGBenefitValue)[];
}
