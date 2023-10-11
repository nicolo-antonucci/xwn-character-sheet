import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { RULESET } from '../../model/properties';
import { CBNavigationProps } from '../../model/props';

function BuilderOptionsScreen(props: BuilderOptionsScreenProps): JSX.Element {
  const firstUpdate = useRef(true);
  const [rs, setRS] = useState<RULESET>(props.ruleset);

  const handleValueChange = (value: string) => {
    if (([RULESET.SWN, RULESET.WWN] as string[]).includes(value)) setRS(value as RULESET);
  };

  const backgroundStyle = {
    backgroundColor: '#FFF',
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    props.rulesetSelectioNhandler(rs);
  }, [rs]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View>
        <Text>Create a character</Text>
        <Text>Choose a ruleset</Text>
        <RadioButton.Group onValueChange={handleValueChange} value={rs}>
          <View>
            <RadioButton value={RULESET.SWN} />
            <Text>Stars Without Number</Text>
          </View>
          <View>
            <RadioButton value={RULESET.WWN} />
            <Text>Worlds Without Number</Text>
          </View>
        </RadioButton.Group>
      </View>
    </SafeAreaView>
  );
}

export default BuilderOptionsScreen;

export interface BuilderOptionsScreenProps extends CBNavigationProps {
  ruleset: RULESET;
  rulesetSelectioNhandler: (ruleset: RULESET) => void;
}
