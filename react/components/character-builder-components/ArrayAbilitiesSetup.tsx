import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { AbilityScores, SCORE } from '../../model/character';
import { Style } from '../../styles/StyleSheet';
import SetStaticScoreModal from './SetStaticScoreModal';

interface DefaultArrayScoreMap {
  14: SCORE | undefined;
  12: SCORE | undefined;
  11: SCORE | undefined;
  10: SCORE | undefined;
  9: SCORE | undefined;
  7: SCORE | undefined;
}

export default function ArrayAbilitiesSetup(props: ArrayAbilitiesSetupProps): JSX.Element {
  const [scores, setScores] = useState<DefaultArrayScoreMap>({
    14: Object.keys(props.scores).find(s => props.scores[s as keyof AbilityScores] === 14) as SCORE | undefined,
    12: Object.keys(props.scores).find(s => props.scores[s as keyof AbilityScores] === 12) as SCORE | undefined,
    11: Object.keys(props.scores).find(s => props.scores[s as keyof AbilityScores] === 11) as SCORE | undefined,
    10: Object.keys(props.scores).find(s => props.scores[s as keyof AbilityScores] === 10) as SCORE | undefined,
    9: Object.keys(props.scores).find(s => props.scores[s as keyof AbilityScores] === 9) as SCORE | undefined,
    7: Object.keys(props.scores).find(s => props.scores[s as keyof AbilityScores] === 7) as SCORE | undefined,
  });
  const [modal, setModal] = useState<{
    visible: boolean;
    selectedValue?: number;
  }>({
    visible: false,
    selectedValue: 14,
  });

  useEffect(() => props.onAbilityScoresChange(mapToAbilityScores(scores)), [scores]);

  const getScoreAt = (value: number | undefined) => {
    return value && [14, 12, 11, 10, 9, 7].includes(value) ? scores[value as keyof DefaultArrayScoreMap] : undefined;
  };

  const getValueForScore = (score: SCORE): number | null => {
    const val = Object.keys(scores).find(k => scores[+k as keyof DefaultArrayScoreMap] === score);
    return val ? +val : null;
  };

  const mapToAbilityScores = (scores: DefaultArrayScoreMap): AbilityScores => {
    return {
      cha: getValueForScore(SCORE.CHA),
      con: getValueForScore(SCORE.CON),
      dex: getValueForScore(SCORE.DEX),
      int: getValueForScore(SCORE.INT),
      str: getValueForScore(SCORE.STR),
      wis: getValueForScore(SCORE.WIS),
    };
  };

  const handleScoreAssignment = (score: SCORE | null): void => {
    const newScores = { ...scores };
    if (score) {
      const prevVal = getValueForScore(score);
      if (prevVal) newScores[prevVal as keyof DefaultArrayScoreMap] = undefined;
    }
    setScores({ ...newScores, [modal.selectedValue as keyof DefaultArrayScoreMap]: score });
    setModal({ visible: false });
  };

  return (
    <View>
      <Portal>
        <Modal visible={modal.visible}>
          <SetStaticScoreModal
            confirmHandler={score => handleScoreAssignment(score)}
            value={modal.selectedValue}
            score={getScoreAt(modal.selectedValue)}
            scores={mapToAbilityScores(scores)}
            undoHandler={() => setModal({ visible: false })}
          ></SetStaticScoreModal>
        </Modal>
      </Portal>

      <View style={Style.scoreBtnsContainer}>
        {Object.keys(scores)
          .sort((a, b) => (+a > +b ? -1 : 1))
          .map((val, i) => (
            <Button
              key={`values-btn-${i}`}
              mode="elevated"
              onPress={() =>
                setModal({
                  visible: true,
                  selectedValue: +val,
                })
              }
              style={Style.scoreBtn}
            >
              {val}
              {getScoreAt(+val) && `: ${getScoreAt(+val)?.toUpperCase()}`}
            </Button>
          ))}
      </View>
    </View>
  );
}

export interface ArrayAbilitiesSetupProps {
  scores: AbilityScores;
  onAbilityScoresChange: (scores: AbilityScores) => void;
}
