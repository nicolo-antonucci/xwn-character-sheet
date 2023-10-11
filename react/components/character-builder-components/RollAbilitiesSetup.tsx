import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { AbilityScores, SCORE } from '../../model/character';
import AppBtn from '../generics/AppBtn';
import SetRolledScoresModal from './SetRolledScoreModal';
import SimpleModal from '../generics/SimpleModal';

function RollAbilitiesSetup(props: RollAbilitiesSetupProps): JSX.Element {
  const [rolledScores, setRolledScores] = useState<
    {
      value: number;
      score?: SCORE;
    }[]
  >([]);
  const [modal, setModal] = useState<{
    visible: boolean;
    selectedScore?: SCORE;
  }>({
    visible: false,
  });
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const scores: AbilityScores = {
      cha: null,
      con: null,
      dex: null,
      int: null,
      str: null,
      wis: null,
    };
    rolledScores.forEach(rs => {
      if (rs.score) scores[rs.score as keyof AbilityScores] = rs.value;
    });
    props.onAbilityScoresChange(scores);
  }, [rolledScores]);

  const checkBeforeRoll = () => {
    if (rolledScores.length === 0) rollScores();
    else setAlert(true);
  };

  const rollScores = () => {
    const values: {
      value: number;
      score?: SCORE;
    }[] = [];
    for (let i = 0; i < 6; i++) {
      let roll = 0;
      for (let j = 0; j < 3; j++) {
        roll += Math.ceil((Math.random() * (1 - 6) + 6) % 6);
      }
      values.push({ value: roll });
    }
    setRolledScores(values);
  };

  const openModal = (score: SCORE) => {
    setModal({ visible: true, selectedScore: score });
  };

  const handleScoreAssignment = (value: number | undefined, score: SCORE | undefined) => {
    setModal({ visible: false });

    if (!score) return;

    if (!value) {
      const prev = rolledScores.findIndex(rs => rs.score === score);
      if (prev === -1) return;
      setRolledScores(
        rolledScores.map((rs, i) => {
          if (prev === i) return { value: rs.value };
          else return rs;
        }),
      );
    } else {
      setRolledScores(
        rolledScores.map(rs => {
          if (rs.value === value) return { value, score };
          else if (rs.score === score) return { value: rs.value };
          else return rs;
        }),
      );
    }
  };

  return (
    <View>
      <Modal animationType="slide" visible={alert}>
        <SimpleModal
          title="Attention"
          confirmHandler={() => {
            setAlert(false);
            rollScores();
          }}
          content={[
            'There are previously rolled and assigned scores.',
            'Rerolling will delete all current information.',
            'Proceed anyway?',
          ]}
          undoHandler={() => setAlert(false)}
        ></SimpleModal>
      </Modal>

      <Modal animationType="slide" visible={modal.visible}>
        <SetRolledScoresModal
          confirmHandler={(value, score) => handleScoreAssignment(value, score)}
          rolledScores={rolledScores}
          score={modal.selectedScore}
          undoHandler={() => setModal({ visible: false })}
        ></SetRolledScoresModal>
      </Modal>

      <View>
        {rolledScores.map((rs, i) => (
          <Text key={`rs-${i}`}>{rs.value}</Text>
        ))}
      </View>
      <AppBtn text={rolledScores.length === 0 ? 'Roll' : 'Reroll'} onPress={checkBeforeRoll}></AppBtn>
      <View>
        {Object.values(SCORE).map((s, index) => (
          <Pressable key={index} onPress={() => openModal(s)}>
            <Text>{s.toUpperCase()}</Text>
            <Text>{props.scores[s] ?? 'Assign'}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default RollAbilitiesSetup;

export interface RollAbilitiesSetupProps {
  scores: AbilityScores;
  onAbilityScoresChange: (scores: AbilityScores) => void;
}
