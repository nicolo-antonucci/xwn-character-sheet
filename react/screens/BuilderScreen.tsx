import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from 'react';
import { AbilityScores, Character } from '../model/character';
import { RULESET } from '../model/properties';
import { CBStackParamList } from '../model/props';
import BuilderAbilitiesScreen from './character-builder-screens/AbilitiesBuilderScreen';
import BuilderOptionsScreen from './character-builder-screens/OptionsBuilderScreen';
import BackgroundBuilderScreen from './character-builder-screens/BackgroundBuilderScreen';
import { BGBenefit, Background, BenefitPickType } from '../model/backgrounds';

function BuilderScreen(): JSX.Element {
  const Tab = createMaterialTopTabNavigator<CBStackParamList>();

  const [ruleset, setRuleset] = useState(RULESET.WWN);
  const [character, setCharacter] = useState<Character>(new Character());

  useEffect(() => {
    setCharacter({ ...character, ruleset });
  }, [ruleset]);

  useEffect(() => console.log(character), [character]);

  const handleAbilityScoresChange = (abilityScores: AbilityScores) => {
    setCharacter({ ...character, abilityScores });
  };

  const handleBackgroundChanges = (changes: {
    background: Background | null;
    benefitPickType: BenefitPickType | null;
    bgBenefits: BGBenefit[] | null;
  }) => {};

  return (
    <Tab.Navigator initialRouteName="Options">
      <Tab.Screen name="Options">
        {props => (
          <BuilderOptionsScreen
            navigation={props.navigation}
            route={props.navigation}
            ruleset={ruleset}
            rulesetSelectioNhandler={ruleset => setRuleset(ruleset)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Abilities">
        {() => (
          <BuilderAbilitiesScreen
            character={character}
            onAbilityScoresChange={handleAbilityScoresChange}
          ></BuilderAbilitiesScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Background">
        {() => (
          <BackgroundBuilderScreen
            character={character}
            onBackgroundChanges={handleBackgroundChanges}
          ></BackgroundBuilderScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default BuilderScreen;
