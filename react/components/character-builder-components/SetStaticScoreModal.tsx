import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { AbilityScores, SCORE } from '../../model/character';

function SetStaticScoreModal(props: SetStaticScoreModalProps): JSX.Element {
  return (
    <View>
      <View>
        {Object.keys(props.scores).map((s, index) => (
          <Button key={`select-score-${index}`} onPress={() => props.confirmHandler(s as SCORE)}>
            {s.toUpperCase() +
              (props.scores[s as keyof AbilityScores] ? ` (${props.scores[s as keyof AbilityScores]})` : '')}
          </Button>
        ))}
      </View>

      <Button onPress={() => props.confirmHandler(null)}>Unassign</Button>
      <Button onPress={props.undoHandler}>Cancel</Button>
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
