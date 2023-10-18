import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import backgrounds from '../../../../assets/rules/wwnBackgrounds.json';
import { Background } from '../../../model/backgrounds';
import { SKILL_CHOICE, SWNSKILLS, WWNSKILLS } from '../../../model/skills';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';
import SelectSkillModal from '../SelectSkillModal';

export default function QuickBGPerks(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [modal, setModal] = useState<number | null>(null);

  const [choices, setChoices] = useState<(SWNSKILLS | WWNSKILLS | undefined)[]>([undefined, undefined]);

  useEffect(() => {
    builderCtx?.setBackgroundPerks(
      builderCtx?.character.characterBackground.bgBenefits?.map((el, i) => ({
        ...el,
        secondaryValue: choices[i],
      })) ?? [],
    );
  }, [choices]);

  return (
    <View>
      <Portal>
        <Modal visible={modal !== null} onDismiss={() => setModal(null)}>
          <SelectSkillModal
            confirmHandler={skill => {
              setChoices(current =>
                current.map((el, i) => {
                  if (modal === i) return skill as SWNSKILLS | WWNSKILLS;
                  return el as SWNSKILLS | WWNSKILLS;
                }),
              );
              setModal(null);
            }}
            type={SKILL_CHOICE.ANY_COMBAT}
            undoHandler={() => setModal(null)}
          />
        </Modal>
      </Portal>

      <View style={{ ...Style.rowFlex, width: '75%', alignItems: 'flex-start', justifyContent: 'space-around' }}>
        {(backgrounds as Background[])
          .find(bg => bg.id === builderCtx?.character.characterBackground.background?.id)
          ?.quickPicks?.map((qp, i) => (
            <View key={`qp-${qp}-${i}`} style={{ ...Style.colFlex, gap: 6 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Skill: </Text>
                <Text>{qp}</Text>
              </View>
              {qp === SKILL_CHOICE.ANY_COMBAT && choices[i] ? (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold' }}>Selected: </Text>
                  <Text>{choices[i]}</Text>
                </View>
              ) : null}
              {qp === SKILL_CHOICE.ANY_COMBAT ? (
                <Button onPress={() => setModal(i)}>{choices[i] ? 'Change' : 'Choose'}</Button>
              ) : null}
            </View>
          ))}
      </View>
    </View>
  );
}
