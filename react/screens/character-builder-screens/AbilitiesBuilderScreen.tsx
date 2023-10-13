import { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ArrayAbilitiesSetup from '../../components/character-builder-components/ArrayAbilitiesSetup';
import RollAbilitiesSetup from '../../components/character-builder-components/RollAbilitiesSetup';
import { Style } from '../../styles/StyleSheet';

type ScoreGen = 'array' | 'roll';

const ScoreGen = {
  ARRAY: 'array' as ScoreGen,
  ROLL: 'roll' as ScoreGen,
};

export default function BuilderAbilitiesScreen(): JSX.Element {
  const [scoreGen, setScoreGen] = useState(ScoreGen.ARRAY);

  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.builderContainer}>
        <Text style={Style.title}>Ability Scores</Text>
        <Text style={Style.subHeading}>Choose a method to generate ability scores</Text>
        <View style={Style.rowFlex}>
          <Button icon="list" mode="contained" onPress={() => setScoreGen(ScoreGen.ARRAY)} style={Style.f1}>
            14, 12, 11, 10, 9, 7
          </Button>
          <Button icon="dice" mode="contained" onPress={() => setScoreGen(ScoreGen.ROLL)} style={Style.f1}>
            Roll (3d6 x 6)
          </Button>
        </View>
        <View>{scoreGen === ScoreGen.ARRAY ? <ArrayAbilitiesSetup /> : <RollAbilitiesSetup />}</View>
      </View>
    </SafeAreaView>
  );
}
