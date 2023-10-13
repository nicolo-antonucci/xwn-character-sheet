import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CBStackParamList, RootNavigationProps } from '../model/props';
import BuilderContextProvider from '../store/context/builder-context';
import { MatTopTabsScreenOpts, Style } from '../styles/StyleSheet';
import BuilderAbilitiesScreen from './character-builder-screens/AbilitiesBuilderScreen';
import BackgroundBuilderScreen from './character-builder-screens/BackgroundBuilderScreen';
import BuilderOptionsScreen from './character-builder-screens/BuilderOptionsScreen';

const Tab = createMaterialTopTabNavigator<CBStackParamList>();

export default function BuilderScreen({ navigation }: RootNavigationProps): JSX.Element {
  return (
    <BuilderContextProvider>
      <Tab.Navigator initialRouteName="Options" style={Style.matTopTabs} screenOptions={MatTopTabsScreenOpts}>
        <Tab.Screen name="Options">
          {props => <BuilderOptionsScreen navigation={props.navigation} route={props.navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Abilities">{() => <BuilderAbilitiesScreen></BuilderAbilitiesScreen>}</Tab.Screen>
        <Tab.Screen name="Background">{() => <BackgroundBuilderScreen></BackgroundBuilderScreen>}</Tab.Screen>
      </Tab.Navigator>
    </BuilderContextProvider>
  );
}
