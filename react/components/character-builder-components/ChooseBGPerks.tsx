import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Checkbox, Modal, Portal, Text } from 'react-native-paper';
import backgrounds from '../../../assets/rules/backgrounds.json';
import { BGBenefit, BGBenefitPickType, Background } from '../../model/backgrounds';
import { SKILL_CHOICE, SWNSKILLS, WWNSKILLS } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import SelectSkill from './SelectSkill';

export default function ChooseBGPerks(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [choices, setChoices] = useState<
    {
      skill: SWNSKILLS | WWNSKILLS | SKILL_CHOICE;
      subChoice?: SWNSKILLS | WWNSKILLS | undefined;
      id: number;
    }[]
  >(
    builderCtx?.character.characterBackground.bgBenefits
      ?.filter(benefit => !benefit.value.includes('Any Skill'))
      .map((benefit, i) => ({
        skill: benefit.value as SWNSKILLS | WWNSKILLS,
        subChoice: benefit.secondaryValue as SWNSKILLS | WWNSKILLS | undefined,
        id: i,
      })) ?? [],
  );

  const [modal, setModal] = useState<number | null>(null);

  useEffect(() => {
    builderCtx?.setBackgroundPerks(
      choices.map(
        c =>
          ({
            type: BGBenefitPickType.CHOSEN,
            value: c.skill,
            secondaryValue: c.subChoice,
          }) as BGBenefit,
      ),
    );
  }, [choices]);

  const handleChoice = (skill: SWNSKILLS | WWNSKILLS, id: number) => {
    const choice = choices.findIndex(c => c.id === id);
    if (choice !== -1) {
      setChoices(choices.filter((c, i) => i !== choice));
      return;
    }

    setChoices([
      ...choices,
      {
        skill,
        id,
      },
    ]);
  };

  return (
    <View>
      <Portal>
        <Modal visible={modal !== null} onDismiss={() => setModal(null)}>
          <SelectSkill
            confirmHandler={skill => {
              setChoices(current =>
                current.map((el, i) => ({
                  ...el,
                  subChoice: modal === i ? skill : el.subChoice,
                })),
              );
              setModal(null);
            }}
            type={modal !== null && choices[modal] ? (choices[modal].skill as SKILL_CHOICE) : SKILL_CHOICE.ANY_SKILL}
            undoHandler={() => setModal(null)}
          ></SelectSkill>
        </Modal>
      </Portal>

      <ScrollView contentContainerStyle={Style.colFlex}>
        <View style={{ ...Style.rowFlex, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          {(backgrounds as Background[])
            .find(bg => bg.id === builderCtx?.character.characterBackground.background?.id)
            ?.learningChoices?.filter(lp => !lp.includes('Any Skill'))
            .map((lp, i) => (
              <View
                key={`cp-${lp}-${i}`}
                style={{ ...Style.rowFlex, flexBasis: '40%', flexGrow: 1, justifyContent: 'flex-start' }}
              >
                <Checkbox
                  disabled={choices.length === 2 && !choices.find(c => c.id === i)}
                  status={choices.find(c => c.id === i) ? 'checked' : 'unchecked'}
                  onPress={() => handleChoice(lp as SWNSKILLS | WWNSKILLS, i)}
                />
                <Text>{lp}</Text>
              </View>
            ))}
        </View>

        <View style={Style.rowFlex}>
          {choices
            .filter(c =>
              ([SKILL_CHOICE.ANY_COMBAT, SKILL_CHOICE.ANY_NON_COMBAT, SKILL_CHOICE.ANY_SKILL] as string[]).includes(
                c.skill,
              ),
            )
            .map((c, i) => (
              <View key={`${c}-${i}`} style={{ ...Style.colFlex, gap: 6 }}>
                {c.subChoice && (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>Selected: </Text>
                    <Text>{c.subChoice}</Text>
                  </View>
                )}
                <Button onPress={() => setModal(i)}>{c.subChoice ? 'Change' : 'Choose'}</Button>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

export interface ChooseBGPerksProps {
  background: Background | undefined;
  onChoicesChanged: (skills: (SWNSKILLS | WWNSKILLS)[]) => void;
}
