import { SCORE } from '../model/character';

export const generateId = (): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 16) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

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

export const sortAlphabetically = (a: string, b: string) => (a > b ? 1 : -1);
