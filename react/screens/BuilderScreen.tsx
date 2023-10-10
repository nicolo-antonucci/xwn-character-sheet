import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from 'react';
import { AbilityScores, Character } from '../model/character';
import { RULESET } from '../model/properties';
import { CBStackParamList } from '../model/props';
import BuilderAbilitiesScreen from './character-builder-screens/AbilitiesBuilderScreen';
import BuilderLandingScreen from './character-builder-screens/LandingBuilderScreen';

function BuilderScreen(): JSX.Element {
  const Tab = createMaterialTopTabNavigator<CBStackParamList>();

  const [ruleset, setRuleset] = useState(RULESET.WWN);
  const [character, setCharacter] = useState<Character>(new Character());

  useEffect(() => {
    setCharacter({ ...character, ruleset });
  }, [ruleset]);

  const handleAbilityScoresChange = (abilityScores: AbilityScores) => {
    setCharacter({ ...character, abilityScores });
  };

  return (
    <Tab.Navigator initialRouteName="Landing">
      <Tab.Screen name="Landing">
        {props => (
          <BuilderLandingScreen
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
    </Tab.Navigator>
  );
}

export default BuilderScreen;
