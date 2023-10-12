import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function CharactersScreen(): JSX.Element {
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
