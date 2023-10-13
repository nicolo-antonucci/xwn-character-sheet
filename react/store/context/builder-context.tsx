import { ReactElement, createContext, useEffect, useState } from 'react';
import { BGBenefit, BGBenefitPickType, Background } from '../../model/backgrounds';
import { AbilityScores, Character } from '../../model/character';
import { RULESET } from '../../model/properties';

export const BuilderContext = createContext<{
  character: Character;
  setRuleset: (ruleset: RULESET) => void;
  setAbilityScores: (abilityScores: AbilityScores) => void;
  setBackground: (background: Background | null) => void;
  setBackgroundPickType: (bgBenefitPickType: BGBenefitPickType) => void;
  setBackgroundPerks: (bgBenefits: BGBenefit[]) => void;
} | null>(null);

export default function BuilderContextProvider({ children }: BuilderContextProviderProps): JSX.Element {
  const [character, setCharacter] = useState<Character>(new Character());

  useEffect(() => console.log(character), [character]);

  function setRuleset(ruleset: RULESET) {
    setCharacter(current => ({
      ...current,
      ruleset,
    }));
  }

  function setAbilityScores(abilityScores: AbilityScores) {
    setCharacter(current => ({
      ...current,
      abilityScores,
    }));
  }

  function setBackground(background: Background | null) {
    setCharacter(current => ({
      ...current,
      characterBackground: {
        ...current.characterBackground,
        background: background ? { id: background.id } : null,
        benefitPickType:
          background && background.id === current.characterBackground.background?.id
            ? current.characterBackground.benefitPickType
            : null,
        bgBenefits:
          background && background.id === current.characterBackground.background?.id
            ? current.characterBackground.bgBenefits
            : null,
      },
    }));
  }

  function setBackgroundPickType(benefitPickType: BGBenefitPickType) {
    setCharacter(current => ({
      ...current,
      characterBackground: {
        ...current.characterBackground,
        benefitPickType,
        bgBenefits:
          current.characterBackground.benefitPickType === benefitPickType
            ? current.characterBackground.bgBenefits
            : null,
      },
    }));
  }

  function setBackgroundPerks(bgBenefits: BGBenefit[]) {
    setCharacter(current => ({
      ...current,
      characterBackground: {
        ...current.characterBackground,
        bgBenefits,
      },
    }));
  }

  return (
    <BuilderContext.Provider
      value={{
        character,
        setRuleset,
        setAbilityScores,
        setBackground,
        setBackgroundPickType,
        setBackgroundPerks,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export interface BuilderContextProviderProps {
  children: ReactElement;
}
