import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SCORE } from '../../model/character';

function SetRolledScoresModal(props: SetRolledScoresModalProps): JSX.Element {
  const errorTemplate = (
    <View>
      <Text>Error processing information</Text>
      <Button onPress={props.undoHandler}>Close</Button>
    </View>
  );

  const assignTemplate = (
    <View>
      <View>
        <Text>
          Choose a value for {props.score?.toUpperCase()}{' '}
          {props.rolledScores.find(rs => rs.score === props.score) &&
            ` (current value: ${props.rolledScores.find(rs => rs.score === props.score)?.value})`}
        </Text>
        {props.rolledScores.map((s, index) => (
          <Button key={`select-score-${index}`} onPress={() => props.confirmHandler(s.value, props.score)}>
            {s.value + (s.score ? ` (${s.score.toUpperCase()})` : '')}
          </Button>
        ))}
      </View>

      <View>
        <Button onPress={() => props.confirmHandler(undefined, props.score)}>Unassign</Button>
        <Button onPress={props.undoHandler}>Cancel</Button>
      </View>
    </View>
  );

  return <View>{props.score ? assignTemplate : errorTemplate}</View>;
}

export default SetRolledScoresModal;

export interface SetRolledScoresModalProps {
  rolledScores: {
    value: number;
    score?: SCORE;
  }[];
  score: SCORE | undefined;
  confirmHandler: (value: number | undefined, score: SCORE | undefined) => void;
  undoHandler: () => void;
}
