import { useContext } from 'react';
import { FlatList } from 'react-native';
import characterClasses from '../../../../assets/rules/characterClasses.json';
import ClassCard from '../../../components/generics/ClassCard';
import { CharacterClass } from '../../../model/characterClass';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function ClassPickerScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const handleSelectionToggle = (characterClass: CharacterClass, val: boolean) => {
    if (builderCtx?.character.characterClass?.id === characterClass.id) {
      if (!val) builderCtx?.setCharacterClass(null);
      return;
    }

    if (val) builderCtx?.setCharacterClass(characterClass);
  };

  return (
    <FlatList
      data={characterClasses as CharacterClass[]}
      renderItem={({ item }) => (
        <ClassCard
          key={`bg-entry-${item.id}`}
          characterClass={item}
          chosen={builderCtx?.character.characterClass?.id === item.id}
          edit={true}
          onSelectionToggle={val => handleSelectionToggle(item, val)}
        />
      )}
      style={Style.f1}
    ></FlatList>
  );
}
