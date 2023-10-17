import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Modal, Portal, Text } from 'react-native-paper';
import backgrounds from '../../../assets/rules/wwnBackgrounds.json';
import { BGBenefit, BGBenefitPickType, BGChoiceBenefit } from '../../model/backgrounds';
import { SCORE } from '../../model/character';
import { SWNSKILLS, WWNSKILLS } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import RollTable from '../generics/RollTable';
import SimpleModal from '../generics/SimpleModal';
import SetBGChoice from './SetBGChoice';

export default function RollBGPerks(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [rolls, setRolls] = useState<
    {
      skill: SWNSKILLS | WWNSKILLS | BGChoiceBenefit;
      subChoice?: SCORE | SWNSKILLS | WWNSKILLS | undefined;
      id: number;
    }[]
  >(
    builderCtx?.character.characterBackground.bgBenefits?.map((benefit, i) => ({
      skill: benefit.value as SWNSKILLS | WWNSKILLS,
      subChoice: benefit.secondaryValue as SWNSKILLS | WWNSKILLS | undefined,
      id: i,
    })) ?? [],
  );

  const [modal, setModal] = useState<{ index: number; choiceType: BGChoiceBenefit } | null>(null);

  const [confirmationModal, setConfirmationModal] = useState<{ show: boolean; type?: 'growth' | 'learning' }>({
    show: false,
  });

  useEffect(() => {
    builderCtx?.setBackgroundPerks(
      rolls.map(
        c =>
          ({
            type: BGBenefitPickType.ROLLED,
            value: c.skill,
            secondaryValue: c.subChoice,
          }) as BGBenefit,
      ),
    );
  }, [rolls]);

  const getBG = () => backgrounds.find(bg => bg.id === builderCtx?.character.characterBackground.background?.id);

  const handleRoll = (type: 'growth' | 'learning') => {
    if (rolls.length === 3) setConfirmationModal({ show: true, type });
    else {
      switch (type) {
        case 'growth':
          rollGrowth();
          break;
        case 'learning':
          rollLearning();
          break;
      }
    }
  };

  const setRollResult = (skill: SWNSKILLS | WWNSKILLS | BGChoiceBenefit) => {
    let result: {
      skill: SWNSKILLS | WWNSKILLS | BGChoiceBenefit;
      subChoice?: SWNSKILLS | WWNSKILLS | undefined;
      id: number;
    };
    if (
      (
        [
          BGChoiceBenefit.ANY_COMBAT,
          BGChoiceBenefit.ANY_SCORE,
          BGChoiceBenefit.ANY_SKILL,
          BGChoiceBenefit.MENTAL,
          BGChoiceBenefit.PHYSICAL,
        ] as string[]
      ).includes(skill)
    ) {
      result = {
        skill,
        id: rolls.length,
        subChoice: undefined,
      };
    } else {
      result = {
        skill,
        id: rolls.length,
      };
    }

    if (rolls.length === 3) setRolls([result]);
    else setRolls(current => [...current, result]);
  };

  const rollLearning = () => {
    const roll = Math.ceil((Math.random() * (1 - 8) + 8) % 8);
    const skill = getBG()?.learningChoices[roll - 1] as SWNSKILLS | WWNSKILLS | BGChoiceBenefit | undefined;
    if (skill) setRollResult(skill);
  };

  const rollGrowth = () => {
    const roll = Math.ceil((Math.random() * (1 - 6) + 6) % 6);
    const skill = getBG()?.growthChoices[roll - 1] as SWNSKILLS | WWNSKILLS | BGChoiceBenefit | undefined;
    if (skill) setRollResult(skill);
  };

  const resetAndRoll = () => {
    switch (confirmationModal.type) {
      case 'growth':
        rollGrowth();
        break;
      case 'learning':
        rollLearning();
        break;
      default:
        break;
    }
    setConfirmationModal({ show: false });
  };

  const handleChoice = (subChoice: SCORE | SWNSKILLS | WWNSKILLS) => {
    setRolls(current =>
      current.map((el, i) => {
        if (i === modal?.index) return { ...el, subChoice };
        return el;
      }),
    );
    setModal(null);
  };

  return (
    <View style={{ ...Style.f1, width: '100%' }}>
      <Portal>
        <Modal visible={modal !== null} onDismiss={() => setModal(null)}>
          <SetBGChoice choice={modal?.choiceType} ruleset={builderCtx?.character.ruleset} onChoice={handleChoice} />
        </Modal>

        <Modal visible={confirmationModal.show} onDismiss={() => setConfirmationModal({ show: false })}>
          <SimpleModal
            confirmHandler={resetAndRoll}
            title="Attention"
            content={[
              'You already rolled three times. Rolling again will delete all previous results.',
              'Do you really want to proceed?',
            ]}
            undoHandler={() => setConfirmationModal({ show: false })}
          />
        </Modal>
      </Portal>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 12, paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <Button icon="dice-d6" mode="text" onPress={() => handleRoll('growth')} style={Style.f1}>
            Roll Growth Table
          </Button>
          <Button icon="dice-d6" mode="text" onPress={() => handleRoll('learning')} style={Style.f1}>
            Roll Learning Table
          </Button>
        </View>

        {rolls.length > 0 ? (
          <View style={{ ...Style.colFlex, paddingBottom: 12 }}>
            {rolls.map((roll, index) => (
              <Card key={`roll-result-${index}`} style={Style.perkCard}>
                <View style={Style.rowFlex}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Result: </Text>
                      <Text>{roll.skill}</Text>
                    </View>
                    {(
                      [
                        BGChoiceBenefit.ANY_COMBAT,
                        BGChoiceBenefit.ANY_SCORE,
                        BGChoiceBenefit.ANY_SKILL,
                        BGChoiceBenefit.MENTAL,
                        BGChoiceBenefit.PHYSICAL,
                      ] as string[]
                    ).includes(roll.skill) && roll.subChoice ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Choice: </Text>
                        <Text>
                          {(Object.values(SCORE) as string[]).includes(roll.subChoice)
                            ? roll.subChoice.toUpperCase()
                            : roll.subChoice}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  {(
                    [
                      BGChoiceBenefit.ANY_COMBAT,
                      BGChoiceBenefit.ANY_SCORE,
                      BGChoiceBenefit.ANY_SKILL,
                      BGChoiceBenefit.MENTAL,
                      BGChoiceBenefit.PHYSICAL,
                    ] as string[]
                  ).includes(roll.skill) ? (
                    <Button
                      style={{ paddingBottom: 0 }}
                      onPress={() =>
                        setModal({
                          index,
                          choiceType: roll.skill as BGChoiceBenefit,
                        })
                      }
                    >
                      {roll.subChoice ? 'Change' : 'Choose'}
                    </Button>
                  ) : null}
                </View>
              </Card>
            ))}
          </View>
        ) : null}

        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <RollTable
            tableId={`${getBG()?.name}-growth-table`}
            title="Growth"
            elements={
              getBG()?.growthChoices?.map(el => ({
                label: el,
                weight: 1,
              })) ?? []
            }
          />
          <RollTable
            tableId={`${getBG()?.name}-learning-table`}
            title="Learning"
            elements={
              getBG()?.learningChoices?.map(el => ({
                label: el,
                weight: 1,
              })) ?? []
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}
