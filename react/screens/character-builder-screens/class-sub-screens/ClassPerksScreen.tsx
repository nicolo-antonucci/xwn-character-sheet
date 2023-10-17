import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import characterClasses from '../../../../assets/rules/wwnCharacterClasses.json';
import SelectFocus from '../../../components/character-builder-components/SelectFocus';
import SelectTradition from '../../../components/character-builder-components/SelectTradition';
import ExpandableCard from '../../../components/generics/ExpandableCard';
import { Focus, FocusType } from '../../../model/Focus';
import { ArcaneTradition, CharacterClass } from '../../../model/characterClass';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function ClassPerksScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [classFoci, setClassFoci] = useState<[Focus | null, Focus | null]>([null, null]);

  const [traditions, setTraditions] = useState<[ArcaneTradition | null, ArcaneTradition | null]>([null, null]);

  const [fociModal, setFociModal] = useState<{ index: number; focusType: FocusType } | null>(null);

  const [traditionModal, setTraditionModal] = useState<{
    index: number;
    tradition: ArcaneTradition | null;
  } | null>(null);

  const getCharacterClass = () =>
    (characterClasses as CharacterClass[]).find(charClass => charClass.id === builderCtx?.character.characterClass?.id);

  const handleFocusSelection = (focus: Focus) => {
    setClassFoci(
      current =>
        current.map((el, i) => {
          if (i !== fociModal?.index) return el;

          return focus;
        }) as [Focus | null, Focus | null],
    );
    setFociModal(null);
  };

  const handleTraditionSelection = (tradition: ArcaneTradition | undefined) => {};

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <Portal>
        <Modal visible={!!fociModal} onDismiss={() => setFociModal(null)}>
          <SelectFocus
            selectedFocus={classFoci[fociModal?.index as number]?.id}
            type={fociModal?.focusType as FocusType}
            confirmHandler={handleFocusSelection}
            undoHandler={() => setFociModal(null)}
          />
        </Modal>

        <Modal visible={!!traditionModal} onDismiss={() => setTraditionModal(null)}>
          <SelectTradition
            selectedTradition={traditions[traditionModal?.index as number]}
            confirmHandler={handleTraditionSelection}
            undoHandler={() => setTraditionModal(null)}
          />
        </Modal>
      </Portal>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, gap: 18 }}>
        {getCharacterClass()?.levelOneFoci?.length && (
          <View style={{ gap: 12 }}>
            <Text style={{ ...Style.title, fontSize: 20 }}>Foci</Text>
            {getCharacterClass()?.levelOneFoci?.map((f, i) => (
              <View key={`class-focus-${i}`} style={{ gap: 12 }}>
                <Text style={{ ...Style.subHeading, fontSize: 16 }}>Choose a {f.toLowerCase()} as a free pick</Text>
                {classFoci[i] && <ExpandableCard element={classFoci[i] as Focus} type={'focus'} />}
                <Button
                  mode="contained-tonal"
                  onPress={() => setFociModal({ index: i, focusType: f })}
                  style={{ alignSelf: 'center' }}
                >
                  {classFoci[i] ? 'Change' : 'Choose'}
                </Button>
              </View>
            ))}
          </View>
        )}

        {getCharacterClass()?.perks?.some(p => p.name === 'Arcane Tradition') && (
          <View>
            <Text style={{ ...Style.title, fontSize: 20 }}>Arcane Tradition</Text>
            {getCharacterClass()
              ?.perks?.filter(p => p.name === 'Arcane Tradition')
              .map((p, i) => (
                <View key={`arcane-tradition-${i}`} style={Style.colFlex}>
                  <Text style={{ ...Style.subHeading, fontSize: 20 }}>Choose an arcane tradition</Text>
                  {traditions[i] && <ExpandableCard element={traditions[i] as ArcaneTradition} type={'tradition'} />}
                  <Button
                    mode="contained-tonal"
                    onPress={() => setTraditionModal({ index: i, tradition: traditions[i] })}
                    style={{ alignSelf: 'center' }}
                  >
                    {classFoci[i] ? 'Change' : 'Choose'}
                  </Button>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
