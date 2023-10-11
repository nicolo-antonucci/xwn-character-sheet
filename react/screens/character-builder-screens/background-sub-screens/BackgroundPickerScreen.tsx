import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import backgrounds from '../../../../assets/rules/backgrounds.json';
import { Background, WWNBACKGROUND } from '../../../model/backgrounds';
import RollTable from '../../../components/generics/RollTable';

function BackgroundPickerScreen(props: BackgroundPickerScreenProps): JSX.Element {
  const [bg, setBg] = useState<Background | null>();
  const [showBg, setShowBg] = useState<WWNBACKGROUND | null>(null);

  const toggleBg = (backgroundName: WWNBACKGROUND | null) => {
    if (showBg === backgroundName) setShowBg(null);
    else setShowBg(backgroundName);
  };

  return (
    <View>
      {(backgrounds as Background[]).map((background, i) => (
        <View key={`bg-entry-${i}`}>
          <View>
            <Button onPress={() => toggleBg(background.name)}>{background.name}</Button>
            <Button>Choose</Button>
          </View>
          {showBg === background.name && (
            <View>
              <Text>{background.description}</Text>
              <View>
                <View></View>
                <View></View>
              </View>
              <RollTable></RollTable>
              <RollTable></RollTable>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default BackgroundPickerScreen;

export interface BackgroundPickerScreenProps {}
