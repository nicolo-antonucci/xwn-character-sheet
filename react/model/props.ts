import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialBottomTabNavigationProp } from 'react-native-paper';

export type RootStackParamList = {
  Home: undefined;
  Builder: undefined;
  Characters: undefined;
  Database: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;

export type CBStackParamList = {
  Options: undefined;
  Abilities: undefined;
  Background: undefined;
  Class: undefined;
};

export type CBNavigationProps = NativeStackScreenProps<CBStackParamList>;

export type BGSelectParamList = {
  Backgrounds: undefined;
  Perks: undefined;
};

export type BGSelectNavigationProps = MaterialBottomTabNavigationProp<BGSelectParamList>;
