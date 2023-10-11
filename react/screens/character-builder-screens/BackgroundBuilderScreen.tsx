import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BackgroundPickerScreen from './background-sub-screens/BackgroundPickerScreen';
import BackgroundPerksScreen from './background-sub-screens/BackgroundPerksScreen';
import { Character } from '../../model/character';
import { Background, BenefitPickType, BGBenefit } from '../../model/backgrounds';

function BackgroundBuilderScreen(props: BackgroundBuilderScreenProps): JSX.Element {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Backgrounds" component={BackgroundPickerScreen}></Tab.Screen>
      <Tab.Screen name="Pick Perks" component={BackgroundPerksScreen}></Tab.Screen>
    </Tab.Navigator>
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
