import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { sortAbilityScores } from '../../commons/Utils';
import { AbilityScores, SCORE } from '../../model/character';
import { Style } from '../../styles/StyleSheet';

export default function SetStaticScoreModal(props: SetStaticScoreModalProps): JSX.Element {
  return (
    <View style={Style.modal}>
      <Text style={Style.title}>Assign {props.value} to a score</Text>
      <View style={Style.modalOptBtnContainer}>
        {Object.keys(props.scores)
          .sort(sortAbilityScores)
          .map((s, index) => (
            <Button
              key={`select-score-${index}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(s as SCORE)}
              style={Style.optionBtn}
            >
              {s.toUpperCase()}
              {props.scores[s as keyof AbilityScores] ? ` (${props.scores[s as keyof AbilityScores]})` : null}
            </Button>
          ))}
      </View>

      <View style={Style.rowFlex}>
        <Button mode="contained" onPress={props.undoHandler}>
          Cancel
        </Button>
        <Button mode="contained" onPress={() => props.confirmHandler(null)}>
          Unassign
        </Button>
      </View>
    </View>
  );
}

export interface SetStaticScoreModalProps {
  value: number | undefined;
  score: string | undefined;
  scores: AbilityScores;
  confirmHandler: (score: SCORE | null) => void;
  undoHandler: () => void;
}
