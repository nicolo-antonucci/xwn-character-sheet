import { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import classes from '../../../../assets/rules/characterClasses.json';
import FocusCard from '../../../components/generics/FocusCard';
import { Focus } from '../../../model/Focus';
import { CharacterClass } from '../../../model/characterClass';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function ClassPerksScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const [classFoci, setClassFoci] = useState<(Focus | null)[]>([]);

  const getCharacterClass = () =>
    (classes as CharacterClass[]).find(bg => bg.id === builderCtx?.character.characterClass?.id);

  const getPickTypes = () => getCharacterClass()?.levelOneFoci;

  return (
    <View style={{ ...Style.f1, ...Style.colFlex, paddingHorizontal: 12 }}>
      {getCharacterClass()?.levelOneFoci?.map((f, i) => (
        <View key={`class-focus-${i}`}>
          <Text style={{ ...Style.title, fontSize: 20 }}>Choose {f.toLowerCase()} as a free pick</Text>
          {classFoci[i] && (
            <FocusCard
              focus={classFoci[i] as Focus}
              chosen={builderCtx?.character.characterBackground.background?.id === item.id}
              edit={true}
              onSelectionToggle={val => handleSelectionToggle(item, val)}
            />
          )}
          <Button>{classFoci[i] ? 'Change' : 'Choose'}</Button>
        </View>
      ))}
    </View>
  );
}
