export type ClassName =
  | 'Expert'
  | 'Warrior'
  | 'Mage'
  | 'Partial Expert/Partial Warrior'
  | 'Partial Expert/Partial Mage'
  | 'Mage Expert/Partial Warrior'
  | 'Mage: Dual Tradition';

export const ClassName = {
  EXPERT: 'Expert' as ClassName,
  WARRIOR: 'Warrior' as ClassName,
  MAGE: 'Mage' as ClassName,
  ADVENTURER_EXPERT_WARRIOR: 'Partial Expert/Partial Warrior' as ClassName,
  ADVENTURER_EXPERT_MAGE: 'Partial Expert/Partial Mage' as ClassName,
  ADVENTURER_MAGE_WARRIOR: 'Partial Mage/Partial Warrior' as ClassName,
  MAGE_DUAL_TRADITION: 'Mage: Dual Tradition' as ClassName,
};

export type LevelOneFocusType = 'Any Combat' | 'Any Non-Combat';

export const LevelOneFocusType = {
  ANY_COMBAT: 'Any Combat' as LevelOneFocusType,
  ANY_NON_COMBAT: 'Any Non-Combat' as LevelOneFocusType,
};

export interface CharacterClass {
  id: number;
  name?: string;
  hitDiceModifier?: number;
  bab?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
  };
  levelOneFoci?: LevelOneFocusType[];
  perks?: {
    name: string;
    description: string[];
  }[];
}
