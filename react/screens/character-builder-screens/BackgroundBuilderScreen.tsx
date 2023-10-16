import { useContext } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import BackgroundPerksScreen from './background-sub-screens/BackgroundPerksScreen';
import BackgroundPickerScreen from './background-sub-screens/BackgroundPickerScreen';

const Tab = createMaterialBottomTabNavigator();

function BackgroundBuilderScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={{ ...Style.backgroundsContainer, paddingHorizontal: 0 }}>
        <Text style={Style.title}>Background</Text>
        <Text style={Style.subHeading}>Choose a background and its perks</Text>
        <Tab.Navigator>
          <Tab.Screen
            component={BackgroundPickerScreen}
            name="Backgrounds"
            options={{
              tabBarLabel: 'Backgrounds',
              tabBarIcon: ({ color }) => <FontAwesome6 name="book" color={color} size={20} />,
            }}
          ></Tab.Screen>
          <Tab.Screen
            component={BackgroundPerksScreen}
            name="Perks"
            options={{
              tabBarLabel: 'Perks',
              tabBarIcon: ({ color }) => <FontAwesome6 name="check-double" color={color} size={20} />,
            }}
            listeners={{
              tabPress: e => {
                if (builderCtx?.character.characterBackground.background === null) e.preventDefault();
              },
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

export default BackgroundBuilderScreen;
