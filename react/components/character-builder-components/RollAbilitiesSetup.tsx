import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { AbilityScores, SCORE } from '../../model/character';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import SimpleModal from '../generics/SimpleModal';
import SetRolledScoresModal from './SetRolledScoreModal';

export default function RollAbilitiesSetup(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [rolledScores, setRolledScores] = useState<{
    [k: string]: {
      value: number;
      score?: SCORE;
    };
  }>({});

  const [modalScore, setModalScore] = useState<SCORE | undefined>(undefined);

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
    Object.values(rolledScores).forEach(rs => {
      const rsScore = rs.score;
      if (rsScore) scores[rsScore as keyof AbilityScores] = rs.value;
    });
    builderCtx?.setAbilityScores(scores);
  }, [rolledScores]);

  const checkBeforeRoll = () => {
    if (Object.values(rolledScores).length === 0) rollScores();
    else setAlert(true);
  };

  const rollScores = () => {
    const values: {
      [k: string]: {
        value: number;
        score?: SCORE;
      };
    } = {};
    for (let i = 0; i < 6; i++) {
      let roll = 0;
      for (let j = 0; j < 3; j++) {
        roll += Math.ceil((Math.random() * (1 - 6) + 6) % 6);
      }
      values[i] = { value: roll };
    }
    setRolledScores(values);
  };

  const openModal = (score: SCORE) => {
    setModalScore(score);
  };

  const handleScoreAssignment = (key: string | undefined, score: SCORE | undefined, prevKey: string | undefined) => {
    setModalScore(undefined);

    if (!key) return;

    if (!score) {
      setRolledScores({
        ...rolledScores,
        [key]: { value: rolledScores[key].value },
      });
      return;
    }
    if (prevKey)
      setRolledScores({
        ...rolledScores,
        [prevKey]: { value: rolledScores[prevKey].value },
        [key]: { value: rolledScores[key].value, score },
      });
    else
      setRolledScores({
        ...rolledScores,
        [key]: { value: rolledScores[key].value, score },
      });
  };

  return (
    <View>
      <Portal>
        <Modal visible={alert}>
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
          />
        </Modal>

        <Modal visible={!!modalScore}>
          <SetRolledScoresModal
            confirmHandler={handleScoreAssignment}
            rolledScores={rolledScores}
            score={modalScore as SCORE}
            undoHandler={() => setModalScore(undefined)}
          />
        </Modal>
      </Portal>

      <View style={Style.scoresContainer}>
        {Object.values(rolledScores).length > 0 && (
          <View style={Style.rowFlex}>
            {Object.values(rolledScores)
              .sort((a, b) => (a.value > b.value ? -1 : 1))
              .map((rs, i) => (
                <Text key={`rs-${i}`} style={Style.title}>
                  {rs.value}
                </Text>
              ))}
          </View>
        )}

        {Object.values(rolledScores).length > 0 && (
          <View style={Style.modalOptBtnContainer}>
            {Object.values(SCORE).map((s, index) => (
              <Button key={index} mode="elevated" onPress={() => openModal(s)} style={Style.optionBtn}>
                {s.toUpperCase()}
                {builderCtx?.character.abilityScores[s] && `: ${builderCtx?.character.abilityScores[s]}`}
              </Button>
            ))}
          </View>
        )}

        <Button icon="dice-d6" mode="contained-tonal" onPress={checkBeforeRoll}>
          {Object.values(rolledScores).length === 0 ? 'Roll!' : 'Reroll'}
        </Button>
      </View>
    </View>
  );
}
