import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CBStackParamList } from '../model/props';
import BuilderContextProvider from '../store/context/builder-context';
import { MatTopTabsScreenOpts, Style } from '../styles/StyleSheet';
import BuilderAbilitiesScreen from './character-builder-screens/AbilitiesBuilderScreen';
import BackgroundBuilderScreen from './character-builder-screens/BackgroundBuilderScreen';
import BuilderOptionsScreen from './character-builder-screens/BuilderOptionsScreen';

const Tab = createMaterialTopTabNavigator<CBStackParamList>();

export default function BuilderScreen(): JSX.Element {
  return (
    <BuilderContextProvider>
      <Tab.Navigator initialRouteName="Options" style={Style.matTopTabs} screenOptions={MatTopTabsScreenOpts}>
        <Tab.Screen name="Options" component={BuilderOptionsScreen} />
        <Tab.Screen name="Abilities" component={BuilderAbilitiesScreen} />
        <Tab.Screen name="Background" component={BackgroundBuilderScreen} />
      </Tab.Navigator>
    </BuilderContextProvider>
  );
}
