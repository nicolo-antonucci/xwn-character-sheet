import { useContext } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { RULESET } from '../../model/properties';
import { CBNavigationProps } from '../../model/props';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';

export default function BuilderOptionsScreen(props: CBNavigationProps): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const handleValueChange = (value: string) => {
    if (([RULESET.SWN, RULESET.WWN] as string[]).includes(value)) builderCtx?.setRuleset(value as RULESET);
  };

  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.builderContainer}>
        <Text style={Style.title}>Create a character</Text>
        <Text style={Style.subHeading}>Choose a ruleset</Text>
        <RadioButton.Group onValueChange={handleValueChange} value={builderCtx?.character.ruleset ?? ''}>
          <View style={Style.rowFlex}>
            <RadioButton value={RULESET.SWN} />
            <Text>Stars Without Number</Text>
          </View>
          <View style={Style.rowFlex}>
            <RadioButton value={RULESET.WWN} />
            <Text>Worlds Without Number</Text>
          </View>
        </RadioButton.Group>
      </View>
    </SafeAreaView>
  );
}
