import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { AbilityScores, SCORE } from '../../model/character';
import SetStaticScoreModal from './SetStaticScoreModal';

function ArrayAbilitiesSetup(props: ArrayAbilitiesSetupProps): JSX.Element {
  const array = [14, 12, 11, 10, 9, 7];

  const [scores, setScores] = useState<AbilityScores>(props.scores);
  const [modal, setModal] = useState<{
    visible: boolean;
    selectedValue?: number;
    title?: string;
  }>({
    visible: false,
    selectedValue: 14,
  });

  useEffect(() => props.onAbilityScoresChange(scores), [scores]);

  const getScoreAt = (value: number | undefined): string | undefined => {
    if (!value) return undefined;

    return Object.keys(scores)
      .find(k => scores[k as keyof AbilityScores] === value)
      ?.toUpperCase();
  };

  const handleScoreAssignment = (score: SCORE | null): void => {
    if (score) {
      const prevScore = getScoreAt(modal.selectedValue);
      if (prevScore) setScores({ ...scores, [score]: modal.selectedValue, [prevScore]: null });
      else setScores({ ...scores, [score]: modal.selectedValue });
    }
    setModal({ visible: false });
  };

  return (
    <View>
      <Modal animationType="slide" visible={modal.visible}>
        <SetStaticScoreModal
          confirmHandler={value => handleScoreAssignment(value)}
          value={modal.selectedValue}
          score={getScoreAt(modal.selectedValue)}
          scores={scores}
          undoHandler={() => setModal({ visible: false })}
        ></SetStaticScoreModal>
      </Modal>
      <View>
        {array.map((val, index) => (
          <Pressable
            key={index}
            onPress={() =>
              setModal({
                visible: true,
                selectedValue: val,
              })
            }
          >
            <Text>{val}</Text>
            <Text>{getScoreAt(val) ?? 'Choose'}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default ArrayAbilitiesSetup;

export interface ArrayAbilitiesSetupProps {
  scores: AbilityScores;
  onAbilityScoresChange: (scores: AbilityScores) => void;
}
