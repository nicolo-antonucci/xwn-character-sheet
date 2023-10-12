import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootNavigationProps } from '../model/props';

export default function DatabaseScreen({ navigation }: RootNavigationProps): JSX.Element {
  const backgroundStyle = {
    backgroundColor: '#FFF',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View>
        <Text>Test</Text>
      </View>
    </SafeAreaView>
  );
}
