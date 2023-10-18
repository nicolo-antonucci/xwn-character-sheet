import { ReactElement, createContext, useEffect, useState } from 'react';
import { generateId } from '../../commons/Utils';
import { BGBenefit, BGBenefitPickType, Background } from '../../model/backgrounds';
import { AbilityScores, Character, CharacterClassInfo } from '../../model/character';
import { ArcaneTradition, CharacterClass } from '../../model/characterClass';
import { FocusSource } from '../../model/focus';
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
  setWarriorFocus: (focusId: number) => void;
  setExpertFocus: (focusId: number) => void;
  setFocus: (focusId: number, entityId?: string) => void;
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
    setCharacter(current => ({
      ...current,
      characterClass: { classId: characterClass.id, level: 1 },
      foci: new Set(Array.from(current.foci).filter(f => f.source === FocusSource.STANDARD)),
    }));
  }

  function setWarriorFocus(focusId: number) {
    setCharacter(current => ({
      ...current,
      foci: new Set([
        ...Array.from(current.foci).filter(f => f.source !== FocusSource.WARRIOR),
        { id: generateId(), source: FocusSource.WARRIOR, focusId, level: 1 },
      ]),
    }));
  }

  function setExpertFocus(focusId: number) {
    setCharacter(current => ({
      ...current,
      foci: new Set([
        ...Array.from(current.foci).filter(f => f.source !== FocusSource.EXPERT),
        { id: generateId(), source: FocusSource.EXPERT, focusId, level: 1 },
      ]),
    }));
  }

  function setFocus(focusId: number, entityId?: string) {
    if (!entityId)
      setCharacter(current => ({
        ...current,
        foci: new Set([
          ...Array.from(current.foci).filter(f => f.source !== FocusSource.EXPERT),
          { id: generateId(), source: FocusSource.STANDARD, focusId, level: 1 },
        ]),
      }));
    else {
      const focus = Array.from(character.foci).find(f => f.id === entityId);
      if (focus)
        setCharacter(current => ({
          ...current,
          foci: new Set([...Array.from(current.foci).filter(f => f.id !== entityId), { ...focus, level: 2 }]),
        }));
    }
  }

  function setArcaneTradition(tradition: ArcaneTradition | null, index: 0 | 1) {
    const arcaneTraditions: (ArcaneTradition | null)[] = character.characterClass?.arcaneTraditions ?? [null, null];
    arcaneTraditions[index] = tradition;

    setCharacter(current => ({
      ...current,
      characterClass: {
        ...(current.characterClass as CharacterClassInfo),
        arcaneTraditions,
      },
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
        setWarriorFocus,
        setExpertFocus,
        setFocus,
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
