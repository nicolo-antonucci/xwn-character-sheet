import { PSYSKILLS, SKILL_CHOICE, SWNSKILLS, WWNSKILLS } from './skills';

export type FocusType = 'Combat Focus' | 'Non-Combat Focus' | 'Origin';

export const FocusType = {
  COMBAT: 'Combat Focus' as FocusType,
  NON_COMBAT: 'Non-Combat Focus' as FocusType,
  ORIGIN: 'Origin' as FocusType,
};

export type FocusSource = 'Warrior' | 'Expert' | 'Standard';

export const FocusSource = {
  WARRIOR: 'Warrior' as FocusSource,
  EXPERT: 'Expert' as FocusSource,
  STANDARD: 'Standard' as FocusSource,
};

export interface Benefit {
  description: string;
  skills?: (SWNSKILLS | WWNSKILLS | PSYSKILLS)[];
  skillChoice?: SKILL_CHOICE | 'Specialist';
  flag?: string;
  setFlag?: string;
  perks?: { description: string; flag?: string }[];
  canBeCustom?: boolean;
  canBeTakenMoreTimes?: boolean;
}

export interface Focus {
  id: number;
  name?: string;
  description?: string;
  lv1?: Benefit;
  lv2?: Benefit;
  level?: 1 | 2;
  type: FocusType;
  hasCustomDescription?: boolean;
  customDescription?: string;
}
