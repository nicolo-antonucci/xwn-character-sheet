import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CBStackParamList } from '../model/props';
import BuilderContextProvider from '../store/context/builder-context';
import { MatTopTabsScreenOpts, Style } from '../styles/StyleSheet';
import BuilderAbilitiesScreen from './character-builder-screens/AbilitiesBuilderScreen';
import BackgroundBuilderScreen from './character-builder-screens/BackgroundBuilderScreen';
import BuilderOptionsScreen from './character-builder-screens/BuilderOptionsScreen';
import ClassBuilderScreen from './character-builder-screens/ClassBuilderScreen';

const Tab = createMaterialTopTabNavigator<CBStackParamList>();

export default function BuilderScreen(): JSX.Element {
  return (
    <BuilderContextProvider>
      <Tab.Navigator
        initialRouteName="Options"
        style={Style.matTopTabs}
        screenOptions={{
          ...MatTopTabsScreenOpts,
          tabBarScrollEnabled: true,
          tabBarAllowFontScaling: true,
          lazy: true,
          lazyPreloadDistance: 1,
        }}
      >
        <Tab.Screen name="Options" component={BuilderOptionsScreen} />
        <Tab.Screen name="Abilities" component={BuilderAbilitiesScreen} />
        <Tab.Screen name="Background" component={BackgroundBuilderScreen} />
        <Tab.Screen name="Class" component={ClassBuilderScreen} />
      </Tab.Navigator>
    </BuilderContextProvider>
  );
}
