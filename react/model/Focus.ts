import { PSYSKILLS, SWNSKILLS, WWNSKILLS } from './skills';

export interface Benefit {
  description: string;
  perks?: { skill: SWNSKILLS | WWNSKILLS | PSYSKILLS } | unknown;
}

export interface Focus {
  id: number;
  name?: string;
  description?: string;
  lv1?: Benefit;
  lv2?: Benefit;
  level?: 1 | 2;
}
