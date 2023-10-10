import { useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { RULESET } from '../../model/properties';
import { CBNavigationProps } from '../../model/props';

function BuilderLandingScreen(props: BuilderLandingScreenProps): JSX.Element {
  const firstUpdate = useRef(true);
  const [rs, setRS] = useState<RULESET>(props.ruleset);

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Stars Without Number',
        value: RULESET.SWN,
      },
      {
        id: '2',
        label: 'Worlds Without Number',
        value: RULESET.WWN,
      },
    ],
    [],
  );

  const handleRadioPress = (id: string) => {
    const val = radioButtons.find(el => el.id === id)?.value;
    if (val) setRS(val as RULESET);
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
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handleRadioPress}
          selectedId={radioButtons.find(el => el.value === rs)?.id}
        ></RadioGroup>
      </View>
    </SafeAreaView>
  );
}

export default BuilderLandingScreen;

export interface BuilderLandingScreenProps extends CBNavigationProps {
  ruleset: RULESET;
  rulesetSelectioNhandler: (ruleset: RULESET) => void;
}
