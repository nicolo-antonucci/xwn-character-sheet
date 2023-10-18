import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SCORE } from '../../../model/character';
import { Style } from '../../../styles/StyleSheet';

export default function SetRolledScoresModal(props: SetRolledScoresModalProps): JSX.Element {
  const findKeyForScore = (score: SCORE) => {
    return Object.keys(props.rolledScores).find(k => props.rolledScores[k].score === score);
  };

  const errorTemplate = (
    <View>
      <Text>Error processing information</Text>
      <Button onPress={props.onUndo}>Close</Button>
    </View>
  );

  const assignTemplate = (
    <View style={Style.modal}>
      <Text style={Style.title}>Choose a value for {props.score?.toUpperCase()}</Text>
      <View style={Style.modalOptBtnContainer}>
        {Object.keys(props.rolledScores)
          .sort((a, b) => (props.rolledScores[a].value > props.rolledScores[b].value ? -1 : 1))
          .map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.onConfirm(k, props.score, findKeyForScore(props.score))}
              style={Style.optionBtn}
            >
              {props.rolledScores[k].value +
                (props.rolledScores[k].score ? ` (${props.rolledScores[k]?.score?.toUpperCase()})` : '')}
            </Button>
          ))}
      </View>

      <View style={Style.rowFlex}>
        <Button mode="contained" onPress={props.onUndo}>
          Cancel
        </Button>
        <Button mode="contained" onPress={() => props.onConfirm(findKeyForScore(props.score))}>
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
  onConfirm: (key: string | undefined, score?: SCORE, prevKey?: string) => void;
  onUndo: () => void;
}
