import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { BuilderContext } from '../../store/context/builder-context';

export default function ClassPickerScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const handleSelectionToggle = (background: Background, val: boolean) => {
    if (builderCtx?.character.characterBackground.background?.id === background.id) {
      if (!val) builderCtx?.setBackground(null);
      return;
    }

    if (val) builderCtx?.setBackground(background);
  };

  return (
    <ScrollView>
      {(classes as Class[]).map(c => (
        <ClassCard
          key={`bg-entry-${item.id}`}
          background={item}
          chosen={builderCtx?.character.characterBackground.background?.id === item.id}
          edit={true}
          onSelectionToggle={val => handleSelectionToggle(item, val)}
        ></ClassCard>
      ))}
    </ScrollView>
  );
}
