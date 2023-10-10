import CheckBox from '@react-native-community/checkbox';
import { Pressable, Text, View } from 'react-native';

function Checkbox(props: CheckboxProps): JSX.Element {
  return (
    <View>
      <CheckBox value={props.value} onChange={props?.onChange} onValueChange={props?.onValueChange}></CheckBox>
      <Pressable onPress={props.onPress}>
        <Text>{props.label}</Text>
      </Pressable>
    </View>
  );
}

export default Checkbox;

export interface CheckboxProps {
  value: boolean;
  label: string;
  disabled?: boolean;
  onChange?: (event: unknown) => void;
  onValueChange?: (val: boolean) => void;
  onPress?: () => void;
}
