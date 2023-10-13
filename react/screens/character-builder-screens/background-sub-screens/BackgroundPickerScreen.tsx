import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import backgrounds from '../../../../assets/rules/backgrounds.json';
import BackgroundCard from '../../../components/generics/BackgroundCard';
import { Background } from '../../../model/backgrounds';
import { Character } from '../../../model/character';
import { Style } from '../../../styles/StyleSheet';

export default function BackgroundPickerScreen(props: BackgroundPickerScreenProps): JSX.Element {
  const [bg, setBg] = useState<Background | null>(props.character.characterBackground.background);

  useEffect(
    () =>
      props.onBackgroundChange(
        bg
          ? {
              id: bg.id,
            }
          : null,
      ),
    [bg],
  );

  const handleSelectionToggle = (background: Background, val: boolean) => {
    if (bg?.name === background.name) {
      if (!val) setBg(null);
      return;
    }

    if (val) setBg(background);
  };

  return (
    <ScrollView style={Style.f1}>
      {(backgrounds as Background[]).map(background => (
        <BackgroundCard
          key={`bg-entry-${background.id}`}
          background={background}
          chosen={bg?.name === background.name}
          edit={true}
          onSelectionToggle={val => handleSelectionToggle(background, val)}
        ></BackgroundCard>
      ))}
    </ScrollView>
  );
}

export interface BackgroundPickerScreenProps {
  character: Character;
  onBackgroundChange: (bg: Background | null) => void;
}
