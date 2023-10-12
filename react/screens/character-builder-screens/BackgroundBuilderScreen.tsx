import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { BGBenefit, Background, BenefitPickType } from '../../model/backgrounds';
import { Character } from '../../model/character';
import { Style } from '../../styles/StyleSheet';
import BackgroundPerksScreen from './background-sub-screens/BackgroundPerksScreen';
import BackgroundPickerScreen from './background-sub-screens/BackgroundPickerScreen';

const Tab = createBottomTabNavigator();

function BackgroundBuilderScreen(props: BackgroundBuilderScreenProps): JSX.Element {
  const handleTabNavigation = (navigationProps: BottomTabBarProps) => (
    <BottomNavigation.Bar
      navigationState={navigationProps.state}
      safeAreaInsets={navigationProps.insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigationProps.navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigationProps.navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: navigationProps.state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = navigationProps.descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }

        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = navigationProps.descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        return label;
      }}
    />
  );

  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.backgroundsContainer}>
        <Text style={Style.title}>Background</Text>
        <Text style={Style.subHeading}>Choose a background and its perks</Text>
        <View style={Style.bgNavigatorContainer}>
          <Tab.Navigator tabBar={handleTabNavigation}>
            <Tab.Screen
              name="Backgrounds"
              component={BackgroundPickerScreen}
              options={{
                tabBarLabel: 'Backgrounds',
              }}
            ></Tab.Screen>
            <Tab.Screen
              name="Perks"
              component={BackgroundPerksScreen}
              options={{
                tabBarLabel: 'Perks',
              }}
            ></Tab.Screen>
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
