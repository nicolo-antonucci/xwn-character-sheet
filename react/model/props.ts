import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Builder: undefined;
  Characters: undefined;
  Database: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;

export type CBStackParamList = {
  Landing: undefined;
  Abilities: undefined;
};

export type CBNavigationProps = NativeStackScreenProps<CBStackParamList>;
