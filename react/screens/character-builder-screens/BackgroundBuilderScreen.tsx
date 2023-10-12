import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { BGBenefit, Background, BenefitPickType } from '../../model/backgrounds';
import { Character } from '../../model/character';
import { Style } from '../../styles/StyleSheet';
import BackgroundPerksScreen from './background-sub-screens/BackgroundPerksScreen';
import BackgroundPickerScreen from './background-sub-screens/BackgroundPickerScreen';

const Tab = createMaterialBottomTabNavigator();

function BackgroundBuilderScreen(props: BackgroundBuilderScreenProps): JSX.Element {
  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.backgroundsContainer}>
        <Text style={Style.title}>Background</Text>
        <Text style={Style.subHeading}>Choose a background and its perks</Text>
        <View style={Style.bgNavigatorContainer}>
          <Tab.Navigator>
            <Tab.Screen name="Backgrounds" component={BackgroundPickerScreen}></Tab.Screen>
            <Tab.Screen name="Perks" component={BackgroundPerksScreen}></Tab.Screen>
          </Tab.Navigator>
        </View>
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
