import { useContext } from 'react';
import { FlatList } from 'react-native';
import characterClasses from '../../../../assets/rules/wwnCharacterClasses.json';
import ExpandableCard from '../../../components/generics/ExpandableCard';
import { CharacterClass } from '../../../model/characterClass';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function ClassPickerScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const handleSelection = (characterClass: CharacterClass) => {
    if (builderCtx?.character.characterClass?.classId !== characterClass.id)
      builderCtx?.setCharacterClass(characterClass);
  };

  return (
    <FlatList
      contentContainerStyle={Style.flatGap}
      data={characterClasses as CharacterClass[]}
      renderItem={({ item }) => (
        <ExpandableCard
          key={`bg-entry-${item.id}`}
          element={item}
          type={'charClass'}
          chosen={builderCtx?.character.characterClass?.classId === item.id}
          selectable={true}
          onSelection={() => handleSelection(item)}
        />
      )}
    ></FlatList>
  );
}
