import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { sortAbilityScores } from '../../../commons/Utils';
import { SCORE } from '../../../model/character';
import { Style } from '../../../styles/StyleSheet';

export default function SetToFourteenModal(props: SetToFourteenModalProps): JSX.Element {
  return (
    <View style={Style.modal}>
      <Text style={Style.title}>Select a score to upgrade to 14</Text>

      <View style={Style.modalOptBtnContainer}>
        {Object.keys(props.rolledScores)
          .filter(k => props.rolledScores[k].score)
          .sort((a, b) =>
            sortAbilityScores(props.rolledScores[a].score as string, props.rolledScores[b].score as string),
          )
          .map(k => (
            <Button
              key={`select-score-${k}`}
              mode={props.increasedScore === k ? 'contained' : 'contained-tonal'}
              onPress={() => props.onSelection(k)}
              style={Style.optionBtn}
            >
              {props.rolledScores[k].score?.toUpperCase()} ({props.rolledScores[k].value})
            </Button>
          ))}
      </View>

      <View style={Style.rowFlex}>
        <Button mode="contained" onPress={props.onUndo}>
          Cancel
        </Button>
        <Button mode="contained" onPress={props.onUnassign}>
          Unassign
        </Button>
      </View>
    </View>
  );
}

export interface SetToFourteenModalProps {
  rolledScores: {
    [k: string]: {
      value: number;
      score?: SCORE;
    };
  };
  increasedScore: string | null;
  onSelection: (k: string) => void;
  onUnassign: () => void;
  onUndo: () => void;
}
