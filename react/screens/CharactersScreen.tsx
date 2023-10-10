import { SafeAreaView, StatusBar, Text, View } from 'react-native';

function CharactersScreen(): JSX.Element {
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

export default CharactersScreen;
