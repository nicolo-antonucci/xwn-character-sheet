import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootNavigationProps } from '../model/props';

function HomeScreen({ navigation }: RootNavigationProps): JSX.Element {
  const backgroundStyle = {
    backgroundColor: '#FFF',
    flex: 1,
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      flex: 1,
      height: '100%',
    },
  });

  const navigationHandler = (path: 'Home' | 'Builder' | 'Characters' | 'Database'): void => {
    navigation.navigate(path);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            xWN Character Sheet
          </Text>
          <Button onPress={() => navigationHandler('Builder')}>Create Character</Button>
          <Button onPress={() => navigationHandler('Characters')}>View Character</Button>
          <Button onPress={() => navigationHandler('Database')}>Edit Database</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
