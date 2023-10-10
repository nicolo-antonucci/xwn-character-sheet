import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { RooStackParamList } from './react/model/props';
import BuilderScreen from './react/screens/BuilderScreen';
import CharactersScreen from './react/screens/CharactersScreen';
import DatabaseScreen from './react/screens/DatabaseScreen';
import HomeScreen from './react/screens/MainScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RooStackParamList>();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Builder" component={BuilderScreen} />
          <Stack.Screen name="Characters" component={CharactersScreen} />
          <Stack.Screen name="Database" component={DatabaseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
