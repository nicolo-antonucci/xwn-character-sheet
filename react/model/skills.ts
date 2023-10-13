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

export const BASESKILLS = {
  ADMINSTER: 'Adminster' as BASESKILLS,
  CONNECT: 'Connect' as BASESKILLS,
  EXTERT: 'Exert' as BASESKILLS,
  HEAL: 'Heal' as BASESKILLS,
  KNOW: 'Know' as BASESKILLS,
  LEAD: 'Lead' as BASESKILLS,
  NOTICE: 'Notice' as BASESKILLS,
  PERFORM: 'Perform' as BASESKILLS,
  PUNCH: 'Punch' as BASESKILLS,
  SHOOT: 'Shoot' as BASESKILLS,
  SNEAK: 'Sneak' as BASESKILLS,
  STAB: 'Stab' as BASESKILLS,
  SURVIVE: 'Survive' as BASESKILLS,
  TRADE: 'Trade' as BASESKILLS,
  WORK: 'Work' as BASESKILLS,
};

export type SWNSKILLS = BASESKILLS | 'Fix' | 'Pilot' | 'Program' | 'Talk';

export type PSYSKILLS = 'Biopsionics' | 'Metapsionics' | 'Precognition' | 'Telekinesis' | 'Telepathy' | 'Teleportation';

export type WWNSKILLS = BASESKILLS | 'Convince' | 'Craft' | 'Magic' | 'Pray' | 'Ride' | 'Sail';

export const SWNSkills = {
  ...BASESKILLS,
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
  ...BASESKILLS,
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

export type SKILL_CHOICE = 'Any Skill' | 'Any Combat' | 'Any Non-Combat';

export const SKILL_CHOICE = {
  ANY_SKILL: 'Any Skill' as SKILL_CHOICE,
  ANY_COMBAT: 'Any Combat' as SKILL_CHOICE,
  ANY_NON_COMBAT: 'Any Non-Combat' as SKILL_CHOICE,
};
