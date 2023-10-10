import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import ArrayAbilitiesSetup from '../../components/character-builder-components/ArrayAbilitiesSetup';
import RollAbilitiesSetup from '../../components/character-builder-components/RollAbilitiesSetup';
import AppBtn from '../../components/generics/AppBtn';
import { AbilityScores, Character } from '../../model/character';

type ScoreGen = 'array' | 'roll';

const ScoreGen = {
  ARRAY: 'array' as ScoreGen,
  ROLL: 'roll' as ScoreGen,
};

function BuilderAbilitiesScreen(props: BuilderAbilitiesScreenProps): JSX.Element {
  const backgroundStyle = {
    backgroundColor: '#FFF',
  };

  const [scoreGen, setScoreGen] = useState(ScoreGen.ARRAY);
  const [scores, setScores] = useState<AbilityScores>(props.character.abilityScores);

  useEffect(() => props.onAbilityScoresChange(scores), [scores]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View>
        <Text>Choose a method to generate ability scores</Text>
        <View>
          <AppBtn text="Array (14...)" touchHandler={() => setScoreGen(ScoreGen.ARRAY)}></AppBtn>
          <AppBtn text="Roll (3d6 x 6)" touchHandler={() => setScoreGen(ScoreGen.ROLL)}></AppBtn>
        </View>
        <View>
          {scoreGen === ScoreGen.ARRAY ? (
            <ArrayAbilitiesSetup scores={scores} onAbilityScoresChange={scores => setScores(scores)} />
          ) : (
            <RollAbilitiesSetup scores={scores} setupHandler={scores => setScores(scores)} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default BuilderAbilitiesScreen;

export interface BuilderAbilitiesScreenProps {
  character: Character;
  onAbilityScoresChange: (scores: AbilityScores) => void;
}
