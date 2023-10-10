import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RooStackParamList = {
  Home: undefined;
  Builder: undefined;
  Characters: undefined;
  Database: undefined;
};

export type NavigationProps = NativeStackScreenProps<RooStackParamList>;
