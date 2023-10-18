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
          <Button
            icon={'square-plus'}
            mode="contained"
            onPress={() => navigation.navigate('Builder')}
            style={Style.homeBtn}
            contentStyle={Style.homeBtnContent}
            labelStyle={{ fontSize: 20 }}
          >
            Create Character
          </Button>
          <Button
            icon="folder"
            mode="contained"
            disabled={true}
            onPress={() => navigation.navigate('Characters')}
            style={Style.homeBtn}
            contentStyle={Style.homeBtnContent}
            labelStyle={{ fontSize: 20 }}
          >
            View Characters
          </Button>
          <Button
            icon="database"
            mode="contained"
            disabled={true}
            onPress={() => navigation.navigate('Database')}
            style={Style.homeBtn}
            contentStyle={Style.homeBtnContent}
            labelStyle={{ fontSize: 20 }}
          >
            Edit Database
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
