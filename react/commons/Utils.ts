import { SCORE } from '../model/character';

export const sortAbilityScores = (a: SCORE | string, b: SCORE | string) => {
  switch (a) {
    case SCORE.STR:
      return -1;
    case SCORE.DEX:
      return b === SCORE.STR ? 1 : -1;
    case SCORE.CON:
      return b === SCORE.STR || b === SCORE.DEX ? 1 : -1;
    case SCORE.INT:
      return b === SCORE.WIS || b === SCORE.CHA ? -1 : 1;
    case SCORE.WIS:
      return b === SCORE.CHA ? -1 : 1;
    case SCORE.CHA:
      return 1;
    default:
      return a <= b ? -1 : 1;
  }
};
