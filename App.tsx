import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { RootStackParamList } from './react/model/props';
import BuilderScreen from './react/screens/BuilderScreen';
import CharactersScreen from './react/screens/CharactersScreen';
import DatabaseScreen from './react/screens/DatabaseScreen';
import HomeScreen from './react/screens/HomeScreen';
import { Style } from './react/styles/StyleSheet';
import { Theme } from './react/styles/Theme';

export default function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <PaperProvider theme={Theme}>
      <View style={Style.f1}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Builder" component={BuilderScreen} />
            <Stack.Screen name="Characters" component={CharactersScreen} />
            <Stack.Screen name="Database" component={DatabaseScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
