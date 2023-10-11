import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

function SimpleModal(props: SimpleModalProps): JSX.Element {
  return (
    <View>
      <Text>{props.title}</Text>
      {props.content.map((txt, i) => (
        <Text key={`alert-content-${i}`}>{txt}</Text>
      ))}
      <View>
        <Button onPress={props.confirmHandler}>Confirm</Button>
        <Button onPress={props.undoHandler}>Cancel</Button>
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
