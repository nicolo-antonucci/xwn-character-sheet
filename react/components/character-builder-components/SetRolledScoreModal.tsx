import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import AppBtn from '../generics/AppBtn';
import { SCORE, AbilityScores } from '../../model/character';

function SetRolledScoresModal(props: SetRolledScoresModalProps): JSX.Element {
  const errorTemplate = (
    <View>
      <Text>Error processing information</Text>
      <AppBtn text="Close" onPress={props.undoHandler} />
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
          <Pressable key={`select-score-${index}`} onPress={() => props.confirmHandler(s.value, props.score)}>
            <Text>{s.value + (s.score ? ` (${s.score})` : '')}</Text>
          </Pressable>
        ))}
      </View>

      <View>
        <AppBtn text="UNASSIGN" onPress={() => props.confirmHandler(undefined, props.score)}></AppBtn>
        <AppBtn text="CANCEL" onPress={props.undoHandler}></AppBtn>
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
