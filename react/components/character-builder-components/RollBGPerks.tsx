import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Modal, Portal, Text } from 'react-native-paper';
import backgrounds from '../../../assets/rules/backgrounds.json';
import { BGBenefit, BGBenefitPickType, BGChoiceBenefit } from '../../model/backgrounds';
import { SWNSKILLS, WWNSKILLS } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import RollTable from '../generics/RollTable';

export default function RollBGPerks(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [rolls, setRolls] = useState<
    {
      skill: SWNSKILLS | WWNSKILLS | BGChoiceBenefit;
      subChoice?: SWNSKILLS | WWNSKILLS | undefined;
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

  const rollLearning = () => {
    const roll = Math.ceil((Math.random() * (1 - 8) + 8) % 8);
    const skill = getBG()?.learningChoices[roll - 1] as SWNSKILLS | WWNSKILLS | BGChoiceBenefit | undefined;
    if (!skill) return;

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
    } else {
      setRolls(current => [
        ...current,
        {
          skill,
          id: current.length,
        },
      ]);
    }
  };

  const rollGrowth = () => {
    const roll = Math.ceil((Math.random() * (1 - 6) + 6) % 6);
    const skill = getBG()?.growthChoices[roll - 1] as SWNSKILLS | WWNSKILLS | BGChoiceBenefit | undefined;
    if (!skill) return;

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
    } else {
      setRolls(current => [
        ...current,
        {
          skill,
          id: current.length,
        },
      ]);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <Portal>
        <Modal visible={modal !== null} onDismiss={() => setModal(null)}>
          ''
        </Modal>
      </Portal>

      <ScrollView contentContainerStyle={{ marginBottom: 100, width: '100%', gap: 12 }}>
        <View style={Style.colFlex}>
          {rolls.map((roll, i) => (
            <Card key={`roll-result-${i}`}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Result: </Text>
                <Text>{roll.skill}</Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <Button icon="dice-d6" mode="text" onPress={rollGrowth} style={Style.f1}>
            Roll Growth Table
          </Button>
          <Button icon="dice-d6" mode="text" onPress={rollLearning} style={Style.f1}>
            Roll Learning Table
          </Button>
        </View>

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
          ></RollTable>
          <RollTable
            tableId={`${getBG()?.name}-learning-table`}
            title="Learning"
            elements={
              getBG()?.learningChoices?.map(el => ({
                label: el,
                weight: 1,
              })) ?? []
            }
          ></RollTable>
        </View>
      </ScrollView>
    </View>
  );
}
