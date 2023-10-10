import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AbilityScores, SCORE } from '../../model/character';
import AppBtn from '../generics/AppBtn';

function RollAbilitiesSetup(props: RollAbilitiesSetupProps): JSX.Element {
  const [rolledScores, setRolledScores] = useState<number[]>([]);

  const rollScores = () => {
    const values: number[] = [];
    for (let i = 0; i < 6; i++) {
      let roll = 0;
      for (let j = 0; j < 3; j++) {
        roll += Math.ceil((Math.random() * (1 - 6) + 6) % 6);
      }
      values.push(roll);
    }
    setRolledScores(values);
  };

  return (
    <View>
      {/* <Modal animationType="slide" visible={modal.visible}>
        <SetStaticScoreModal
          confirmHandler={value => handleScoreAssignment(value)}
          value={modal.selectedValue}
          score={getScoreAt(modal.selectedValue)}
          scores={scores}
          undoHandler={() => setModal({ visible: false })}
        ></SetStaticScoreModal>
      </Modal> */}
      <View>
        {rolledScores.map((rs, i) => (
          <Text key={`rs-${i}`}>{rs}</Text>
        ))}
      </View>
      <AppBtn text={rolledScores.length === 0 ? 'Roll' : 'Reroll'} touchHandler={() => rollScores()}></AppBtn>
      <View>
        {Object.values(SCORE).map((s, index) => (
          <Pressable key={index} onPress={() => null}>
            <Text>{s.toUpperCase()}</Text>
            <Text>{props.scores[s] ?? 'Assign'}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default RollAbilitiesSetup;

export interface RollAbilitiesSetupProps {
  scores: AbilityScores;
  onAbilityScoresChange: (scores: AbilityScores) => void;
}
