import { Text } from 'react-native';

function SimpleModal(props: SimpleModalProps): JSX.Element {
  return <Text>{props.title}</Text>;
}

export default SimpleModal;

export interface SimpleModalProps {
  title: string;
  content: string;
  confirmHandler: (value: string) => void;
  undoHandler: (value: string) => void;
}
