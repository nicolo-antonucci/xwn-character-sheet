import { useContext } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import ClassPerksScreen from './class-sub-screens/ClassPerksScreen';
import ClassPickerScreen from './class-sub-screens/ClassPickerScreen';

const Tab = createMaterialBottomTabNavigator();

export default function ClassBuilderScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.builderScreensContainer}>
        <Text style={{ ...Style.title, paddingTop: 18 }}>Class</Text>
        <Text style={Style.subHeading}>Choose a class and its perks</Text>
        <Tab.Navigator>
          <Tab.Screen
            component={ClassPickerScreen}
            name="Classes"
            options={{
              tabBarLabel: 'Classes',
              tabBarIcon: ({ color }) => <FontAwesome6 name="hat-wizard" color={color} size={20} />,
            }}
          ></Tab.Screen>
          <Tab.Screen
            component={ClassPerksScreen}
            name="Foci & Traditions"
            options={{
              tabBarLabel: 'Foci & Traditions',
              tabBarIcon: ({ color }) => <FontAwesome6 name="check-double" color={color} size={20} />,
            }}
            listeners={{
              tabPress: e => {
                if (builderCtx?.character.characterClass === null) e.preventDefault();
              },
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}
