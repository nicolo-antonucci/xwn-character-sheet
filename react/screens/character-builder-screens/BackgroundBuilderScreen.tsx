import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { BGBenefit, Background, BenefitPickType } from '../../model/backgrounds';
import { Character } from '../../model/character';
import { Style } from '../../styles/StyleSheet';
import BackgroundPerksScreen from './background-sub-screens/BackgroundPerksScreen';
import BackgroundPickerScreen from './background-sub-screens/BackgroundPickerScreen';

const Tab = createMaterialBottomTabNavigator();

function BackgroundBuilderScreen(props: BackgroundBuilderScreenProps): JSX.Element {
  const [characterBg, setCharacterBg] = useState<{
    background: Background | null;
    benefitPickType: BenefitPickType | null;
    bgBenefits: BGBenefit[] | null;
  }>(props.character.characterBackground);

  useEffect(() => props.onBackgroundChanges(characterBg), [characterBg]);

  const handleBgChange = (background: Background | null) => setCharacterBg({ ...characterBg, background });
  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.backgroundsContainer}>
        <Text style={Style.title}>Background</Text>
        <Text style={Style.subHeading}>Choose a background and its perks</Text>
        <Tab.Navigator>
          <Tab.Screen
            name="Backgrounds"
            options={{
              tabBarLabel: 'Backgrounds',
              tabBarIcon: ({ color }) => <FontAwesome5 name="book" color={color} size={20} />,
            }}
          >
            {() => <BackgroundPickerScreen character={props.character} onBackgroundChange={handleBgChange} />}
          </Tab.Screen>
          <Tab.Screen
            name="Perks"
            component={BackgroundPerksScreen}
            options={{
              tabBarLabel: 'Perks',
              tabBarIcon: ({ color }) => <FontAwesome5 name="check-double" color={color} size={20} />,
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

export default BackgroundBuilderScreen;

export interface BackgroundBuilderScreenProps {
  character: Character;
  onBackgroundChanges: (changes: {
    background: Background | null;
    benefitPickType: BenefitPickType | null;
    bgBenefits: BGBenefit[] | null;
  }) => void;
}
