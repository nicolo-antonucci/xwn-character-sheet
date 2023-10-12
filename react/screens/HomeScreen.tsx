import { SafeAreaView, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootNavigationProps } from '../model/props';
import { Style } from '../styles/StyleSheet';

export default function HomeScreen({ navigation }: RootNavigationProps): JSX.Element {
  return (
    <SafeAreaView style={Style.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={Style.homeContainer}>
        <Text style={Style.title}>xWN Character Sheet</Text>
        <View style={Style.mainContainer}>
          <Button mode="contained" onPress={() => navigation.navigate('Builder')}>
            Create Character
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate('Characters')}>
            View Character
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate('Database')}>
            Edit Database
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
