import { createContext } from 'react';
import { RULESET } from '../../model/properties';

export const BuilderContext = createContext({
  ruleset: RULESET.WWN,
});
