import { useContext } from 'react';
import { FlatList } from 'react-native';
import backgrounds from '../../../../assets/rules/wwnBackgrounds.json';
import ExpandableCard from '../../../components/generics/ExpandableCard';
import { Background } from '../../../model/backgrounds';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';

export default function BackgroundPickerScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const handleSelectionToggle = (background: Background) => {
    if (builderCtx?.character.characterBackground.background?.id === background.id) builderCtx?.setBackground(null);
    else builderCtx?.setBackground(background);
  };

  return (
    <FlatList
      contentContainerStyle={Style.flatGap}
      data={backgrounds as Background[]}
      renderItem={({ item }) => (
        <ExpandableCard
          key={`bg-entry-${item.id}`}
          element={item}
          type={'bg'}
          chosen={builderCtx?.character.characterBackground.background?.id === item.id}
          selectable={true}
          onSelection={() => handleSelectionToggle(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
}
