import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { AbilityScores, SCORE } from '../../../model/character';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';
import SimpleModal from '../../generics/SimpleModal';
import SetRolledScoresModal from './SetRolledScoreModal';
import SetToFourteenModal from './SetToFourteenModal';

export default function RollAbilitiesSetup(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [rolledScores, setRolledScores] = useState<{
    [k: string]: {
      value: number;
      score?: SCORE;
    };
  }>({});

  const [increasedScore, setIncreasedScore] = useState<string | null>(null);

  const [modalScore, setModalScore] = useState<SCORE | undefined>(undefined);

  const [showUpModal, setShowUpModal] = useState<boolean>(false);

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

    if (key === increasedScore) setIncreasedScore(null);

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

  const handleSetToFourteen = (k?: string) => {
    const scores: AbilityScores = {
      cha: null,
      con: null,
      dex: null,
      int: null,
      str: null,
      wis: null,
    };
    if (k) {
      const currIncreasedScore = rolledScores[k];
      Object.keys(rolledScores).forEach(key => {
        if (key === k) scores[currIncreasedScore.score as SCORE] = 14;
        else {
          const rs = rolledScores[key];
          if (rs.score) scores[rs.score as SCORE] = rs.value;
        }
      });
      builderCtx?.setAbilityScores(scores);
    } else setRolledScores(rolledScores);

    setIncreasedScore(k ?? null);
    setShowUpModal(false);
  };

  return (
    <View>
      <Portal>
        <Modal visible={alert} onDismiss={() => setAlert(false)}>
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

        <Modal visible={!!modalScore} onDismiss={() => setModalScore(undefined)}>
          <SetRolledScoresModal
            onConfirm={handleScoreAssignment}
            rolledScores={rolledScores}
            score={modalScore as SCORE}
            onUndo={() => setModalScore(undefined)}
          />
        </Modal>

        <Modal visible={showUpModal} onDismiss={() => setShowUpModal(false)}>
          <SetToFourteenModal
            increasedScore={increasedScore}
            rolledScores={rolledScores}
            onSelection={handleSetToFourteen}
            onUnassign={handleSetToFourteen}
            onUndo={() => setShowUpModal(false)}
          />
        </Modal>
      </Portal>

      <View style={Style.scoresContainer}>
        {Object.values(rolledScores).length > 0 ? (
          <View style={Style.rowFlex}>
            {Object.values(rolledScores)
              .sort((a, b) => (a.value > b.value ? -1 : 1))
              .map((rs, i) => (
                <Text key={`rs-${i}`} style={Style.title}>
                  {rs.value}
                </Text>
              ))}
          </View>
        ) : null}

        {Object.values(rolledScores).length > 0 ? (
          <View style={Style.modalOptBtnContainer}>
            {Object.values(SCORE).map((s, index) => (
              <Button key={index} mode="elevated" onPress={() => openModal(s)} style={Style.optionBtn}>
                {s.toUpperCase()}
                {builderCtx?.character.abilityScores[s] ? `: ${builderCtx?.character.abilityScores[s]}` : null}
              </Button>
            ))}
          </View>
        ) : null}

        <View style={Style.rowFlex}>
          <Button icon="dice-d6" mode="contained-tonal" onPress={checkBeforeRoll}>
            {Object.values(rolledScores).length === 0 ? 'Roll!' : 'Reroll'}
          </Button>
          {Object.values(rolledScores).filter(v => v.score).length === 6 ? (
            <Button icon={'angles-up'} mode="contained-tonal" onPress={() => setShowUpModal(true)}>
              Set to 14
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  );
}
