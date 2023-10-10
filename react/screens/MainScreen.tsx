import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import AppBtn from '../components/generics/AppBtn';
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
          <AppBtn text="Create Character" style={{ color: '#fff' }} touchHandler={() => navigationHandler('Builder')} />
          <AppBtn
            text="View Character"
            style={{ color: '#fff' }}
            touchHandler={() => navigationHandler('Characters')}
          />
          <AppBtn text="Edit Database" style={{ color: '#fff' }} touchHandler={() => navigationHandler('Database')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
