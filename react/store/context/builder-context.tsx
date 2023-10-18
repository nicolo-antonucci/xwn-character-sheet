import { ReactElement, createContext, useEffect, useState } from 'react';
import foci from '../../../assets/rules/wwnFoci.json';
import { BGBenefit, BGBenefitPickType, Background } from '../../model/backgrounds';
import { AbilityScores, Character } from '../../model/character';
import { ArcaneTradition, CharacterClass } from '../../model/characterClass';
import { Focus } from '../../model/focus';
import { RULESET } from '../../model/properties';
import { WWNSKILLS, WWNSkills } from '../../model/skills';

export const BuilderContext = createContext<{
  character: Character;
  setRuleset: (ruleset: RULESET) => void;
  setAbilityScores: (abilityScores: AbilityScores) => void;
  setBackground: (background: Background | null) => void;
  setBackgroundPickType: (bgBenefitPickType: BGBenefitPickType) => void;
  setBackgroundPerks: (bgBenefits: BGBenefit[]) => void;
  setCharacterClass: (characterClass: CharacterClass) => void;
  setClassFoci: (combatFocus: number | null | undefined, nonCombatFocus: number | null | undefined) => void;
  setArcaneTradition: (tradition: ArcaneTradition | null, index: 0 | 1) => void;
  setVowedSkill: (skill: WWNSKILLS) => void;
} | null>(null);

export default function BuilderContextProvider({ children }: BuilderContextProviderProps): JSX.Element {
  const [character, setCharacter] = useState<Character>(new Character());

  useEffect(() => {
    console.log(character);
  }, [character]);

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

  function setCharacterClass(characterClass: CharacterClass) {
    setCharacter(current => {
      return {
        ...current,
        characterClass: characterClass ? { id: characterClass.id } : null,
        foci: current.foci.filter(
          f => current.levelOneFoci?.combatFocus !== f.focus.id && current.levelOneFoci?.nonCombatFocus !== f.focus.id,
        ),
        levelOneFoci: { combatFocus: undefined, nonCombatFocus: undefined },
        vowedSkill: undefined,
      };
    });
  }

  function setClassFoci(combatFocus: number | null | undefined, nonCombatFocus: number | null | undefined) {
    const cf = (foci as Focus[]).find(f => f.id === combatFocus);
    const ncf = (foci as Focus[]).find(f => f.id === nonCombatFocus);
    setCharacter(current => ({
      ...current,
      foci:
        cf || ncf
          ? ([
              ...current.foci.filter(
                f =>
                  current.levelOneFoci?.combatFocus !== f.focus.id &&
                  current.levelOneFoci?.nonCombatFocus !== f.focus.id &&
                  combatFocus !== f.focus.id &&
                  nonCombatFocus !== f.focus.id,
              ),
              cf ? { focus: { id: cf.id }, level: 1 } : undefined,
              ncf ? { focus: { id: ncf.id }, level: 1 } : undefined,
            ].filter(f => f?.focus) as { focus: Focus; level: 1 | 2 }[])
          : current.foci.filter(
              f =>
                current.levelOneFoci?.combatFocus !== f.focus.id || current.levelOneFoci?.nonCombatFocus !== f.focus.id,
            ),
      levelOneFoci: { combatFocus, nonCombatFocus },
    }));
  }

  function setArcaneTradition(tradition: ArcaneTradition | null, index: 0 | 1) {
    const arcaneTraditions: (ArcaneTradition | null)[] = character.arcaneTraditions ?? [null, null];
    arcaneTraditions[index] = tradition;

    setCharacter(current => ({
      ...current,
      characterClass: current.characterClass?.id ? { ...current.characterClass } : null,
      arcaneTraditions,
      vowedSkill: undefined,
    }));
  }

  function setVowedSkill(skill: WWNSKILLS) {
    if (![WWNSkills.EXERT, WWNSkills.KNOW, WWNSkills.MAGIC, WWNSkills.PRAY].includes(skill)) return;

    setCharacter(current => ({
      ...current,
      vowedSkill: skill,
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
        setCharacterClass,
        setClassFoci,
        setArcaneTradition,
        setVowedSkill,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export interface BuilderContextProviderProps {
  children: ReactElement;
}
