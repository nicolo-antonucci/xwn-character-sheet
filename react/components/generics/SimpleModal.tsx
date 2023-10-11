import { Text, View } from 'react-native';
import AppBtn from './AppBtn';

function SimpleModal(props: SimpleModalProps): JSX.Element {
  return (
    <View>
      <Text>{props.title}</Text>
      {props.content.map((txt, i) => (
        <Text key={`alert-content-${i}`}>{txt}</Text>
      ))}
      <View>
        <AppBtn text="CONFIRM" onPress={props.confirmHandler}></AppBtn>
        <AppBtn text="CANCEL" onPress={props.undoHandler}></AppBtn>
      </View>
    </View>
  );
}

export default SimpleModal;

export interface SimpleModalProps {
  title: string;
  content: string[];
  confirmHandler: () => void;
  undoHandler: () => void;
}
