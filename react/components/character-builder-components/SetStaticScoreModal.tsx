import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AbilityScores, SCORE } from '../../model/character';
import AppBtn from '../generics/AppBtn';

function SetStaticScoreModal(props: SetStaticScoreModalProps): JSX.Element {
  const [score, setScore] = useState<SCORE | null>(null);

  return (
    <View>
      <View>
        {Object.keys(props.scores).map((s, index) => (
          <Pressable key={`select-score-${index}`} onPress={() => setScore(s as SCORE)}>
            <Text>
              {s.toUpperCase() +
                (props.scores[s as keyof AbilityScores] ? ` (${props.scores[s as keyof AbilityScores]})` : '')}
            </Text>
          </Pressable>
        ))}
      </View>

      <AppBtn text="CONFIRM" touchHandler={() => props.confirmHandler(score)}></AppBtn>
      <AppBtn text="CANCEL" touchHandler={props.undoHandler}></AppBtn>
    </View>
  );
}

export default SetStaticScoreModal;

export interface SetStaticScoreModalProps {
  value: number | undefined;
  score: string | undefined;
  scores: AbilityScores;
  confirmHandler: (score: SCORE | null) => void;
  undoHandler: () => void;
}
