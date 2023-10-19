import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import characterClasses from '../../../../assets/rules/wwnCharacterClasses.json';
import foci from '../../../../assets/rules/wwnFoci.json';
import FocusPicker from '../../../components/character-builder-components/FocusPicker';
import SelectFocusModal from '../../../components/character-builder-components/SelectFocusModal';
import SelectSkillModal from '../../../components/character-builder-components/SelectSkillModal';
import SelectTraditionModal from '../../../components/character-builder-components/character-class-components/SelectTraditionModal';
import ExpandableCard from '../../../components/generics/ExpandableCard';
import { ArcaneTradition, CharacterClass, ClassName } from '../../../model/characterClass';
import { Focus, FocusSource, FocusType } from '../../../model/focus';
import { PSYSKILLS, SKILL_CHOICE, SWNSKILLS, WWNSKILLS } from '../../../model/skills';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function ClassPerksScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [fociModal, setFociModal] = useState<FocusSource | null>(null);
  const [traditionModal, setTraditionModal] = useState<0 | 1 | null>(null);
  const [skillModal, setSkillModal] = useState<{
    visible: boolean;
    skillChoiceType?: SKILL_CHOICE | 'Specialist' | (WWNSKILLS | SWNSKILLS | PSYSKILLS)[] | null;
    source?: FocusSource;
  }>({ visible: false });
  const [vowedModal, setVowedModal] = useState<boolean>(false);

  const getCharacterClass = () =>
    (characterClasses as CharacterClass[]).find(
      charClass => charClass.id === builderCtx?.character.characterClass?.classId,
    );

  const getFocusInfoBySource = (source: FocusSource) =>
    Array.from(builderCtx?.character.foci ?? []).find(focus => focus.source === source);

  const getFocusBySource = (source: FocusSource) =>
    (foci as Focus[]).find(f => f.id === getFocusInfoBySource(source)?.focusId);

  const getTradition = (index: number) => builderCtx?.character.characterClass?.arcaneTraditions?.[index];

  const handleFocusSelection = (focus: Focus) => {
    switch (fociModal) {
      case FocusSource.WARRIOR:
        builderCtx?.setWarriorFocus(focus.id);
        break;
      case FocusSource.EXPERT:
        builderCtx?.setExpertFocus(focus.id);
        break;
    }
    setFociModal(null);
  };

  const handleTraditionSelection = (tradition: ArcaneTradition | null, index: 0 | 1) => {
    builderCtx?.setArcaneTradition(tradition, index);
    setTraditionModal(null);
  };

  const handleSkillSelection = (skill: SWNSKILLS | WWNSKILLS | PSYSKILLS) => {
    const entityId = getFocusInfoBySource(skillModal.source as FocusSource)?.id;
    if (entityId) builderCtx?.setFocusSkillChoice(entityId, [skill]);
    setSkillModal({ visible: false });
  };

  const handleVowedSkillSelection = (skill: SWNSKILLS | WWNSKILLS | PSYSKILLS) => {
    builderCtx?.setVowedSkill(skill as WWNSKILLS);
    setVowedModal(false);
  };

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <Portal>
        <Modal visible={!!fociModal} onDismiss={() => setFociModal(null)}>
          <SelectFocusModal
            selectedFocus={getFocusInfoBySource(fociModal as FocusSource)?.focusId}
            type={fociModal === FocusSource.WARRIOR ? FocusType.COMBAT : FocusType.NON_COMBAT}
            confirmHandler={handleFocusSelection}
            undoHandler={() => setFociModal(null)}
          />
        </Modal>

        <Modal visible={traditionModal !== null} onDismiss={() => setTraditionModal(null)}>
          <SelectTraditionModal
            selectedTradition={getTradition(traditionModal as number)}
            traditionType={getCharacterClass()?.name === ClassName.MAGE ? 'full' : 'partial'}
            confirmHandler={tradition => handleTraditionSelection(tradition ?? null, traditionModal as 0 | 1)}
            undoHandler={() => setTraditionModal(null)}
          />
        </Modal>

        <Modal visible={skillModal.visible} onDismiss={() => setSkillModal({ visible: false })}>
          <SelectSkillModal
            type={skillModal.skillChoiceType as SKILL_CHOICE | (WWNSKILLS | SWNSKILLS | PSYSKILLS)[] | 'Specialist'}
            selectedValue={getFocusInfoBySource(skillModal.source as FocusSource)?.skillChoices?.[0]}
            confirmHandler={handleSkillSelection}
            undoHandler={() => setSkillModal({ visible: false })}
          />
        </Modal>

        <Modal visible={vowedModal} onDismiss={() => setVowedModal(false)}>
          <SelectSkillModal
            type={'Vowed Effort Skill'}
            selectedValue={builderCtx?.character.characterClass?.vowedSkill}
            confirmHandler={handleVowedSkillSelection}
            undoHandler={() => setVowedModal(false)}
          />
        </Modal>
      </Portal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 6, gap: 18 }}
      >
        {getCharacterClass()?.name?.includes('Warrior') || getCharacterClass()?.name?.includes('Expert') ? (
          <View style={{ gap: 12 }}>
            <Text style={{ ...Style.title, fontSize: 20 }}>Foci</Text>

            {getCharacterClass()?.name?.includes('Warrior') ? (
              <FocusPicker
                focus={getFocusInfoBySource(FocusSource.WARRIOR)}
                type={FocusSource.WARRIOR}
                onRequestFocusPick={() => setFociModal(FocusSource.WARRIOR)}
                onRequestSkillPick={() =>
                  setSkillModal({
                    visible: true,
                    source: FocusSource.WARRIOR,
                    skillChoiceType: getFocusBySource(FocusSource.WARRIOR)?.lv1?.skillChoice,
                  })
                }
              />
            ) : null}

            {getCharacterClass()?.name?.includes('Expert') ? (
              <FocusPicker
                focus={getFocusInfoBySource(FocusSource.EXPERT)}
                type={FocusSource.EXPERT}
                onRequestFocusPick={() => setFociModal(FocusSource.EXPERT)}
                onRequestSkillPick={() =>
                  setSkillModal({
                    visible: true,
                    source: FocusSource.EXPERT,
                    skillChoiceType: getFocusBySource(FocusSource.EXPERT)?.lv1?.skillChoice,
                  })
                }
              />
            ) : null}
          </View>
        ) : null}

        {getCharacterClass()?.perks?.some(p => p.name === 'Arcane Tradition') ? (
          <View style={{ gap: 12 }}>
            <Text style={{ ...Style.title, fontSize: 20 }}>Arcane Tradition</Text>
            {getCharacterClass()
              ?.perks?.filter(p => p.name === 'Arcane Tradition')
              .map((p, i) => (
                <View key={`arcane-tradition-${i}`} style={{ gap: 12 }}>
                  <Text style={{ ...Style.subHeading, fontSize: 16 }}>Choose an arcane tradition</Text>
                  {getTradition(i) ? (
                    <ExpandableCard element={getTradition(i) as ArcaneTradition} type={'tradition'} />
                  ) : null}
                  <Button
                    mode="contained-tonal"
                    onPress={() => setTraditionModal(i as 0 | 1)}
                    style={{ alignSelf: 'center' }}
                  >
                    {getTradition(i) ? 'Change' : 'Choose'}
                  </Button>
                  {getTradition(i) === ArcaneTradition.VOWED ? (
                    <View style={Style.rowFlex}>
                      {builderCtx?.character.characterClass?.vowedSkill ? (
                        <>
                          <Text style={Style.bold}>Effort Skill:</Text>
                          <Text> {builderCtx?.character.characterClass?.vowedSkill}</Text>
                        </>
                      ) : null}
                      <Button onPress={() => setVowedModal(true)} style={{ alignSelf: 'center' }}>
                        {builderCtx?.character.characterClass?.vowedSkill ? 'Change' : 'Choose effort skill'}
                      </Button>
                    </View>
                  ) : null}
                </View>
              ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
