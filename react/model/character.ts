import { RULESET } from './properties';

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

export type BASESKILLS =
  | 'Adminster'
  | 'Connect'
  | 'Exert'
  | 'Heal'
  | 'Know'
  | 'Lead'
  | 'Notice'
  | 'Perform'
  | 'Punch'
  | 'Shoot'
  | 'Sneak'
  | 'Stab'
  | 'Survive'
  | 'Trade'
  | 'Work';

export type SWNSKILLS = BASESKILLS | 'Fix' | 'Pilot' | 'Program' | 'Talk';

export type PSYSKILLS = 'Biopsionics' | 'Metapsionics' | 'Precognition' | 'Telekinesis' | 'Telepathy' | 'Teleportation';

export type WWNSKILLS = BASESKILLS | 'Convince' | 'Craft' | 'Magic' | 'Pray' | 'Ride' | 'Sail';

export const SWNSkills = {
  ADMINSTER: 'Adminster' as SWNSKILLS,
  CONNECT: 'Connect' as SWNSKILLS,
  EXTERT: 'Exert' as SWNSKILLS,
  HEAL: 'Heal' as SWNSKILLS,
  KNOW: 'Know' as SWNSKILLS,
  LEAD: 'Lead' as SWNSKILLS,
  NOTICE: 'Notice' as SWNSKILLS,
  PERFORM: 'Perform' as SWNSKILLS,
  PUNCH: 'Punch' as SWNSKILLS,
  SHOOT: 'Shoot' as SWNSKILLS,
  SNEAK: 'Sneak' as SWNSKILLS,
  STAB: 'Stab' as SWNSKILLS,
  SURVIVE: 'Survive' as SWNSKILLS,
  TRADE: 'Trade' as SWNSKILLS,
  WORK: 'Work' as SWNSKILLS,
  FIX: 'Fix' as SWNSKILLS,
  PILOT: 'Pilot' as SWNSKILLS,
  PROGRAM: 'Program' as SWNSKILLS,
  TALK: 'Talk' as SWNSKILLS,
};

export const PSYSKILLS = {
  BIOPSIONICS: 'Biopsionics' as PSYSKILLS,
  METAPSIONICS: 'Metapsionics' as PSYSKILLS,
  PRECOGNITION: 'Precognition' as PSYSKILLS,
  TELEKINESIS: 'Telekinesis' as PSYSKILLS,
  TELEPATHY: 'Telepathy' as PSYSKILLS,
  TELEPORTATION: 'Teleportation' as PSYSKILLS,
};

export const WWNSkills = {
  ADMINSTER: 'Adminster' as WWNSKILLS,
  CONNECT: 'Connect' as WWNSKILLS,
  EXTERT: 'Exert' as WWNSKILLS,
  HEAL: 'Heal' as WWNSKILLS,
  KNOW: 'Know' as WWNSKILLS,
  LEAD: 'Lead' as WWNSKILLS,
  NOTICE: 'Notice' as WWNSKILLS,
  PERFORM: 'Perform' as WWNSKILLS,
  PUNCH: 'Punch' as WWNSKILLS,
  SHOOT: 'Shoot' as WWNSKILLS,
  SNEAK: 'Sneak' as WWNSKILLS,
  STAB: 'Stab' as WWNSKILLS,
  SURVIVE: 'Survive' as WWNSKILLS,
  TRADE: 'Trade' as WWNSKILLS,
  WORK: 'Work' as WWNSKILLS,
  CONVINCE: 'Convince' as WWNSKILLS,
  CRAFT: 'Craft' as WWNSKILLS,
  MAGIC: 'Magic' as WWNSKILLS,
  PRAY: 'Pray' as WWNSKILLS,
  RIDE: 'Ride' as WWNSKILLS,
  SAIL: 'Sail' as WWNSKILLS,
};

export type Skills = {
  [key in PSYSKILLS | SWNSKILLS | WWNSKILLS]: -1 | 0 | 1 | 2 | 3 | 4;
};

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
  ruleset: RULESET | null = null;
  abilityScores: AbilityScores;
  skills: Skills | null;
  foci: Focus[];

  constructor() {
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
  }
}
