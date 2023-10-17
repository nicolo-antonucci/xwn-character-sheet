import { PSYSKILLS, SWNSKILLS, WWNSKILLS } from './skills';

export interface Benefit {
  description: string;
  skill?: SWNSKILLS | WWNSKILLS | PSYSKILLS;
  flag?: string;
  setFlag?: string;
}

export interface Focus {
  id: number;
  name?: string;
  description?: string;
  lv1?: Benefit;
  lv2?: Benefit;
  level?: 1 | 2;
}
