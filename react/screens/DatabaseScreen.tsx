import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import { NavigationProps } from '../model/props';

function DatabaseScreen({ navigation }: NavigationProps): JSX.Element {
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

export default DatabaseScreen;
