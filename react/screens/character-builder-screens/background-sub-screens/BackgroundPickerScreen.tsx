import { useContext } from 'react';
import { ScrollView } from 'react-native';
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
    <ScrollView style={Style.f1}>
      {(backgrounds as Background[]).map(background => (
        <BackgroundCard
          key={`bg-entry-${background.id}`}
          background={background}
          chosen={builderCtx?.character.characterBackground.background?.id === background.id}
          edit={true}
          onSelectionToggle={val => handleSelectionToggle(background, val)}
        ></BackgroundCard>
      ))}
    </ScrollView>
  );
}
