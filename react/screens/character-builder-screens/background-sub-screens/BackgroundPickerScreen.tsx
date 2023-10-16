import { useContext } from 'react';
import { FlatList } from 'react-native';
import backgrounds from '../../../../assets/rules/backgrounds.json';
import BackgroundCard from '../../../components/generics/BackgroundCard';
import { Background } from '../../../model/backgrounds';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function BackgroundPickerScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const handleSelectionToggle = (background: Background, val: boolean) => {
    if (builderCtx?.character.characterBackground.background?.id === background.id) {
      if (!val) builderCtx?.setBackground(null);
      return;
    }

    if (val) builderCtx?.setBackground(background);
  };

  return (
    <FlatList
      data={backgrounds as Background[]}
      renderItem={({ item }) => (
        <BackgroundCard
          key={`bg-entry-${item.id}`}
          background={item}
          chosen={builderCtx?.character.characterBackground.background?.id === item.id}
          edit={true}
          onSelectionToggle={val => handleSelectionToggle(item, val)}
        ></BackgroundCard>
      )}
      style={Style.f1}
    ></FlatList>
  );
}
