import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Style } from '../../styles/StyleSheet';

export default function SimpleModal(props: SimpleModalProps): JSX.Element {
  return (
    <View style={Style.modal}>
      <Text style={Style.title}>{props.title}</Text>
      <View>
        {props.content.map((txt, i) => (
          <Text key={`alert-content-${i}`}>{txt}</Text>
        ))}
      </View>
      <View style={Style.rowFlex}>
        <Button mode="contained" onPress={props.undoHandler}>
          Cancel
        </Button>
        <Button mode="contained" onPress={props.confirmHandler}>
          Confirm
        </Button>
      </View>
    </View>
  );
}

export interface SimpleModalProps {
  title: string;
  content: string[];
  confirmHandler: () => void;
  undoHandler: () => void;
}
