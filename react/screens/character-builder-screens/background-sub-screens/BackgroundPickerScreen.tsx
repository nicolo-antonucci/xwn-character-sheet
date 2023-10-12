import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import backgrounds from '../../../../assets/rules/backgrounds.json';
import RollTable from '../../../components/generics/RollTable';
import { Background, WWNBACKGROUND } from '../../../model/backgrounds';

export default function BackgroundPickerScreen(props: BackgroundPickerScreenProps): JSX.Element {
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
              <RollTable
                tableId={`${background.name}-growth-table`}
                title="Growth"
                elements={background.growthChoices.map(el => ({
                  label: el,
                  weight: 1,
                }))}
              ></RollTable>
              <RollTable
                tableId={`${background.name}-learning-table`}
                title="Learning"
                elements={background.learningChoices.map(el => ({
                  label: el,
                  weight: 1,
                }))}
              ></RollTable>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export interface BackgroundPickerScreenProps {}
