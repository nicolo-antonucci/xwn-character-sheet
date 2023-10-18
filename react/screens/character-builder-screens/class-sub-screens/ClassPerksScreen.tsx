import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import characterClasses from '../../../../assets/rules/wwnCharacterClasses.json';
import SelectFocusModal from '../../../components/character-builder-components/SelectFocusModal';
import SelectSkillModal from '../../../components/character-builder-components/SelectSkillModal';
import SelectTraditionModal from '../../../components/character-builder-components/character-class-components/SelectTraditionModal';
import ExpandableCard from '../../../components/generics/ExpandableCard';
import { ArcaneTradition, CharacterClass, ClassName } from '../../../model/characterClass';
import { Focus, FocusType } from '../../../model/focus';
import { SWNSKILLS, WWNSKILLS } from '../../../model/skills';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function ClassPerksScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [fociModal, setFociModal] = useState<FocusType | null>(null);

  const [traditionModal, setTraditionModal] = useState<0 | 1 | null>(null);

  const [vowedModal, setVowedModal] = useState<boolean>(false);

  const getCharacterClass = () =>
    (characterClasses as CharacterClass[]).find(charClass => charClass.id === builderCtx?.character.characterClass?.id);

  const getFocusByType = (f: FocusType) => {
    switch (f) {
      case FocusType.COMBAT:
        return builderCtx?.character.levelOneFoci?.combatFocus
          ? { id: builderCtx?.character.levelOneFoci?.combatFocus }
          : undefined;
      case FocusType.NON_COMBAT:
        return builderCtx?.character.levelOneFoci?.nonCombatFocus
          ? { id: builderCtx?.character.levelOneFoci?.nonCombatFocus }
          : undefined;
      default:
        return undefined;
    }
  };

  const getTradition = (index: number) => builderCtx?.character.arcaneTraditions?.[index];

  const handleFocusSelection = (focus: Focus) => {
    switch (fociModal) {
      case FocusType.COMBAT:
        builderCtx?.setClassFoci(focus.id, builderCtx.character.levelOneFoci?.nonCombatFocus);
        break;
      case FocusType.NON_COMBAT:
        builderCtx?.setClassFoci(builderCtx.character.levelOneFoci?.combatFocus, focus.id);
        break;
    }
    setFociModal(null);
  };

  const handleTraditionSelection = (tradition: ArcaneTradition | null, index: 0 | 1) => {
    builderCtx?.setArcaneTradition(tradition, index);
    setTraditionModal(null);
  };

  const handleVowedSkillSelection = (skill: SWNSKILLS | WWNSKILLS) => {
    builderCtx?.setVowedSkill(skill as WWNSKILLS);
    setVowedModal(false);
  };

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <Portal>
        <Modal visible={!!fociModal} onDismiss={() => setFociModal(null)}>
          <SelectFocusModal
            selectedFocus={getFocusByType(fociModal as FocusType)?.id}
            type={fociModal as FocusType}
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

        <Modal visible={vowedModal} onDismiss={() => setVowedModal(false)}>
          <SelectSkillModal
            type={'Vowed Effort Skill'}
            selectedValue={builderCtx?.character.vowedSkill}
            confirmHandler={handleVowedSkillSelection}
            undoHandler={() => setVowedModal(false)}
          />
        </Modal>
      </Portal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 6, gap: 18 }}
      >
        {getCharacterClass()?.levelOneFoci?.length ? (
          <View style={{ gap: 12 }}>
            <Text style={{ ...Style.title, fontSize: 20 }}>Foci</Text>
            {getCharacterClass()?.levelOneFoci?.map((f, i) => (
              <View key={`class-focus-${i}`} style={{ gap: 12 }}>
                <Text style={{ ...Style.subHeading, fontSize: 16 }}>Choose a {f.toLowerCase()} as a free pick</Text>
                {getFocusByType(f) !== null && getFocusByType(f) !== undefined ? (
                  <ExpandableCard element={getFocusByType(f) as Focus} type={'focus'} />
                ) : null}
                <Button mode="contained-tonal" onPress={() => setFociModal(f)} style={{ alignSelf: 'center' }}>
                  {getFocusByType(f) ? 'Change' : 'Choose'}
                </Button>
              </View>
            ))}
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
                      {builderCtx?.character.vowedSkill ? (
                        <>
                          <Text style={Style.bold}>Effort Skill:</Text>
                          <Text> {builderCtx?.character.vowedSkill}</Text>
                        </>
                      ) : null}
                      <Button onPress={() => setVowedModal(true)} style={{ alignSelf: 'center' }}>
                        {builderCtx?.character.vowedSkill ? 'Change' : 'Choose effort skill'}
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
