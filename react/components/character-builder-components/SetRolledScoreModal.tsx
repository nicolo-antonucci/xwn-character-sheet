import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SCORE } from '../../model/character';
import { Style } from '../../styles/StyleSheet';

export default function SetRolledScoresModal(props: SetRolledScoresModalProps): JSX.Element {
  const findKeyForScore = (score: SCORE) => {
    return Object.keys(props.rolledScores).find(k => props.rolledScores[k].score === score);
  };

  const findScoreValue = (score: SCORE) => {
    return Object.values(props.rolledScores).find(rs => rs.score === props.score)?.value;
  };

  const errorTemplate = (
    <View>
      <Text>Error processing information</Text>
      <Button onPress={props.undoHandler}>Close</Button>
    </View>
  );

  const assignTemplate = (
    <View style={Style.modal}>
      <Text style={Style.title}>Choose a value for {props.score?.toUpperCase()}</Text>
      <View style={Style.scoreBtnsContainer}>
        {Object.keys(props.rolledScores)
          .sort((a, b) => (props.rolledScores[a].value > props.rolledScores[b].value ? -1 : 1))
          .map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(k, props.score, findKeyForScore(props.score))}
              style={Style.scoreBtn}
            >
              {props.rolledScores[k].value +
                (props.rolledScores[k].score ? ` (${props.rolledScores[k]?.score?.toUpperCase()})` : '')}
            </Button>
          ))}
      </View>

      <View style={Style.rowFlex}>
        <Button mode="contained" onPress={props.undoHandler}>
          Cancel
        </Button>
        <Button mode="contained" onPress={() => props.confirmHandler(findKeyForScore(props.score))}>
          Unassign
        </Button>
      </View>
    </View>
  );

  return <View>{props.score ? assignTemplate : errorTemplate}</View>;
}

export interface SetRolledScoresModalProps {
  rolledScores: {
    [k: string]: {
      value: number;
      score?: SCORE;
    };
  };
  score: SCORE;
  confirmHandler: (key: string | undefined, score?: SCORE, prevKey?: string) => void;
  undoHandler: () => void;
}
